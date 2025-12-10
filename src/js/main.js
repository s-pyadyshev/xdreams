import { accordion } from "./components/accordion.js";
import { mobileMenu } from "./components/mobile-menu.js";
import { sliderJobs } from "./components/sliderJobs.js";
import { sliderFeatures } from "./components/sliderFeatures.js";
import { sliderSpotlight } from "./components/sliderSpotlight.js";
import { sliderValues } from "./components/sliderValues.js";
import { sliderSteps } from "./components/sliderSteps.js";
import { toggle } from "./components/toggle.js";
import { quiz } from "./components/quiz.js";
import { tabs } from "./components/tabs.js";
import { scrollspy } from "./components/scrollspy.js";
import { heroScroll } from "./components/heroScroll.js";

let globalPercentDisplay = null;
let globalLoaderContainer = null;

document.addEventListener("DOMContentLoaded", () => {
  const loaderContainer = document.querySelector(".image-sequence-loading");
  if (loaderContainer && !globalLoaderContainer) {
    globalLoaderContainer = loaderContainer;

    const percentDisplay = document.createElement("div");
    percentDisplay.className = "loading-percent";
    percentDisplay.textContent = "0%";
    loaderContainer.appendChild(percentDisplay);
    loaderContainer.classList.add("show");

    globalPercentDisplay = percentDisplay;
  }
});

window.addEventListener(
  "load",
  () => {
    mobileMenu.init();
    accordion.init();
    sliderJobs.init();
    sliderFeatures.init();
    sliderSpotlight.init();
    sliderSteps.init();
    sliderValues.init();
    toggle.init();
    quiz.init();
    scrollspy.init();
    tabs.init();
    heroScroll.init();

    const loaderContainer =
      globalLoaderContainer ||
      document.querySelector(".image-sequence-loading");
    const percentDisplay = globalPercentDisplay;

    if (loaderContainer && percentDisplay) {
      gsap.registerPlugin(ScrollTrigger);

      const sections = gsap.utils.toArray(".pin-section");
      const imageSequenceScrollText = document.querySelector(
        ".image-sequece-wrapper__scroll"
      );

      let lastScrollTop = window.scrollY;
      let isSnapping = false;
      let isLastSectionGlobal = false;
      let currentBreakpoint =
        window.innerWidth <= 767
          ? "mobile"
          : window.innerWidth <= 1024
          ? "tablet"
          : "desktop";

      function getImagePath(basePath) {
        return basePath;
      }

      function getFileNameWithSuffix(baseName, index) {
        const paddedIndex = (index + 1).toString().padStart(3, "0");
        let suffix = "";
        if (window.innerWidth <= 767) {
          suffix = "-mobile";
        } else if (window.innerWidth <= 1024) {
          suffix = "-tablet";
        }
        return `${baseName}${suffix}-${paddedIndex}.webp`;
      }

      class ProgressiveImageLoader {
        constructor() {
          this.imageCache = new Map();
          this.loadingQueue = [];
          this.concurrentLoads = 8;
          this.activeLoads = 0;
          this.sectionsLoading = new Set();
          this.sectionsLoaded = new Set();
        }

        loadImage(url) {
          if (this.imageCache.has(url)) {
            return Promise.resolve(this.imageCache.get(url));
          }

          return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
              this.imageCache.set(url, img);
              this.activeLoads--;
              this.processQueue();
              resolve(img);
            };

            img.onerror = () => {
              this.activeLoads--;
              this.processQueue();
              reject(new Error(`Failed to load ${url}`));
            };

            if (this.activeLoads < this.concurrentLoads) {
              this.activeLoads++;
              img.src = url;
            } else {
              this.loadingQueue.push({ img, url, resolve, reject });
            }
          });
        }

        processQueue() {
          while (
            this.loadingQueue.length > 0 &&
            this.activeLoads < this.concurrentLoads
          ) {
            const { img, url, resolve, reject } = this.loadingQueue.shift();
            this.activeLoads++;
            img.onload = () => {
              this.imageCache.set(url, img);
              this.activeLoads--;
              this.processQueue();
              resolve(img);
            };
            img.onerror = () => {
              this.activeLoads--;
              this.processQueue();
              reject(new Error(`Failed to load ${url}`));
            };
            img.src = url;
          }
        }

        async loadSection(sectionIndex, urls) {
          if (
            this.sectionsLoaded.has(sectionIndex) ||
            this.sectionsLoading.has(sectionIndex)
          ) {
            return;
          }

          this.sectionsLoading.add(sectionIndex);

          const chunkSize = 20;
          for (let i = 0; i < urls.length; i += chunkSize) {
            const chunk = urls.slice(i, i + chunkSize);
            await Promise.allSettled(chunk.map((url) => this.loadImage(url)));
          }

          this.sectionsLoading.delete(sectionIndex);
          this.sectionsLoaded.add(sectionIndex);
        }

        getImage(url) {
          return this.imageCache.get(url);
        }

        isSectionLoaded(sectionIndex) {
          return this.sectionsLoaded.has(sectionIndex);
        }

        isLoading(sectionIndex) {
          return this.sectionsLoading.has(sectionIndex);
        }

        clearCache() {
          this.imageCache.clear();
          this.sectionsLoaded.clear();
          this.sectionsLoading.clear();
          this.loadingQueue = [];
        }
      }

      const imageLoader = new ProgressiveImageLoader();

      function buildSectionData() {
        return sections.map((section, index) => {
          const frameCount = parseInt(section.dataset.frameCount, 10);
          const baseImagePath = section.dataset.imagePath;
          const basePath = getImagePath(baseImagePath);

          const urls = Array.from({ length: frameCount }, (_, i) => {
            const fileName = getFileNameWithSuffix(basePath, i);
            return fileName;
          });

          return {
            section,
            index,
            frameCount,
            basePath,
            urls,
            canvas: section.querySelector(".image-sequence-canvas"),
          };
        });
      }

      let sectionData = buildSectionData();

      function resizeCanvas(canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        let displayWidth = rect.width;
        let displayHeight = rect.height;

        if (displayWidth <= 0 || displayHeight <= 0) {
          displayWidth = window.innerWidth;
          displayHeight = window.innerHeight;
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 1);

        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = displayWidth + "px";
        canvas.style.height = displayHeight + "px";

        const ctx = canvas.getContext("2d", { alpha: false });
        ctx.scale(dpr, dpr);
      }

      function drawImageCover(ctx, img, canvasW, canvasH) {
        if (canvasW <= 0 || canvasH <= 0 || img.width <= 0 || img.height <= 0)
          return;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasW / canvasH;

        let drawW, drawH, drawX, drawY;

        if (imgRatio > canvasRatio) {
          drawH = canvasH;
          drawW = canvasH * imgRatio;
        } else {
          drawW = canvasW;
          drawH = canvasW / imgRatio;
        }

        drawX = (canvasW - drawW) / 2;
        drawY = (canvasH - drawH) / 2;

        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }

      function imageSequence({
        urls,
        canvas,
        scrollTrigger,
        onComplete,
        effectiveFps = 15,
        sectionIndex,
      }) {
        const ctx = canvas.getContext("2d", { alpha: false });
        let curFrame = -1;
        let playhead = { frame: 0 };
        let hasTriggeredNextLoad = false;

        const updateImage = () => {
          const frame = Math.round(playhead.frame);
          if (frame !== curFrame) {
            const img = imageLoader.getImage(urls[frame]);
            if (img?.complete) {
              drawImageCover(ctx, img, canvas.width, canvas.height);
              curFrame = frame;
            }
          }

          if (!hasTriggeredNextLoad && frame > 0) {
            hasTriggeredNextLoad = true;
            const nextSectionIndex = sectionIndex + 1;

            if (nextSectionIndex < sectionData.length) {
              const nextSection = sectionData[nextSectionIndex];

              if (
                !imageLoader.isSectionLoaded(nextSectionIndex) &&
                !imageLoader.isLoading(nextSectionIndex)
              ) {
                imageLoader.loadSection(nextSectionIndex, nextSection.urls);
              }
            }
          }
        };

        const duration = urls.length / effectiveFps;

        return gsap.to(playhead, {
          frame: urls.length - 1,
          ease: "none",
          duration: duration,
          onUpdate: updateImage,
          onComplete: onComplete,
          scrollTrigger: scrollTrigger,
        });
      }

      function updateLoaderPercent(loaded, total) {
        if (!percentDisplay) return;
        const percent = Math.min(100, Math.round((loaded / total) * 100));
        percentDisplay.textContent = `${percent}%`;
        if (percent === 100) {
          setTimeout(() => {
            loaderContainer.classList.add("fade-out");
            setTimeout(() => {
              loaderContainer.style.display = "none";
            }, 1000);
          }, 300);
        }
      }

      async function initializeSequences() {
        const firstFrameUrls = sectionData.map(({ urls }) => urls[0]);
        const totalImages = firstFrameUrls.length;

        if (totalImages === 0) {
          updateLoaderPercent(1, 1);
          return;
        }

        let loadedCount = 0;
        updateLoaderPercent(0, totalImages);

        const loadPromises = firstFrameUrls.map((url) =>
          imageLoader
            .loadImage(url)
            .then(() => {
              loadedCount++;
              updateLoaderPercent(loadedCount, totalImages);
            })
            .catch(() => {
              loadedCount++;
              updateLoaderPercent(loadedCount, totalImages);
            })
        );

        await Promise.all(loadPromises);

        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));

        sectionData.forEach(({ canvas }) => {
          if (canvas) resizeCanvas(canvas);
        });

        if (sectionData[0]) {
          await imageLoader.loadSection(0, sectionData[0].urls);
        }

        sectionData.forEach(({ canvas, basePath }) => {
          if (!canvas) return;
          const firstUrl = getFileNameWithSuffix(basePath, 0);
          const img = imageLoader.getImage(firstUrl);
          if (img?.complete) {
            const ctx = canvas.getContext("2d", { alpha: false });
            drawImageCover(ctx, img, canvas.width, canvas.height);
          }
        });

        sectionData.forEach(({ section, urls, canvas, index }) => {
          if (!canvas) return;

          const nextSection = sections[index + 1];
          const isLastSection = index + 1 === sections.length - 1;

          const handleComplete = () => {
            if (nextSection) {
              nextSection.classList.add("pin-section-in-transition");
              gsap.to(window, {
                duration: 1,
                scrollTo: nextSection,
                overwrite: "auto",
                onStart: () => {
                  if (!nextSection.classList.contains("last-section")) {
                    imageSequenceScrollText?.classList.remove("hidden");
                  } else {
                    imageSequenceScrollText?.classList.add("hidden");
                  }
                },
                onComplete: () => {
                  nextSection.classList.remove("pin-section-in-transition");
                  if (isLastSection) {
                    isLastSectionGlobal = true;
                    imageSequenceScrollText?.classList.add("hidden");
                    setTimeout(() => {
                      const menu = document.querySelector(".menu");
                      const menuLinkFirst = document
                        .querySelectorAll(".menu__item")[0]
                        ?.querySelector(".menu__link");
                      const menuContentFirst =
                        menuLinkFirst?.nextElementSibling?.querySelector("li");

                      menu?.classList.toggle("active");
                      menuLinkFirst?.classList.toggle("active");
                      menuContentFirst?.classList.toggle("active");
                    }, 2000);
                  } else {
                    isLastSectionGlobal = false;
                    if (index + 1 < sections.length - 1) {
                      imageSequenceScrollText?.classList.remove("hidden");
                    }
                  }
                },
              });
            }
          };

          const scrollTriggerConfig = {
            trigger: section,
            pin: true,
            start: "top top",
            end: "bottom top",
            scrub: true,
            snap: 0.7,
            onToggle: (self) => {
              if (self.isActive) {
                if (index < sections.length - 1) {
                  imageSequenceScrollText?.classList.remove("hidden");
                } else {
                  imageSequenceScrollText?.classList.add("hidden");
                }
              }
            },
          };

          imageSequence({
            urls,
            canvas,
            scrollTrigger: scrollTriggerConfig,
            onComplete: handleComplete,
            effectiveFps: 15,
            sectionIndex: index,
          });
        });

        if (sections.length > 1) {
          imageSequenceScrollText?.classList.remove("hidden");
        }
      }

      initializeSequences();

      window.addEventListener("scroll", () => {
        if (!isSnapping) {
          lastScrollTop = window.scrollY;
        }
        if (isLastSectionGlobal) {
          const menu = document.querySelector(".menu");
          const menuLinkFirst = document
            .querySelectorAll(".menu__item")[0]
            ?.querySelector(".menu__link");
          const menuContentFirst =
            menuLinkFirst?.nextElementSibling?.querySelector("li");

          menu?.classList.remove("active");
          menuLinkFirst?.classList.remove("active");
          menuContentFirst?.classList.remove("active");
        }
      });

      ScrollTrigger.addEventListener("scrollEnd", () => {
        if (isSnapping) return;

        const currentScroll = window.scrollY;
        const direction = currentScroll > lastScrollTop ? "down" : "up";

        if (direction === "up") {
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            if (sectionTop <= currentScroll) {
              if (i > 0) {
                const prevSection = sections[i - 1];
                const currentSection = sections[i];
                const sectionHeight = section.offsetHeight;
                const distanceFromTop = currentScroll - sectionTop;

                if (distanceFromTop < sectionHeight * 0.3) {
                  currentSection.classList.add("pin-section-in-transition");
                  isSnapping = true;

                  window.scrollTo({
                    top: prevSection.offsetTop,
                    behavior: "auto",
                  });

                  requestAnimationFrame(() => {
                    currentSection.classList.remove(
                      "pin-section-in-transition"
                    );
                    isSnapping = false;

                    if (i - 1 < sections.length - 1) {
                      imageSequenceScrollText?.classList.remove("hidden");
                    }
                  });
                }
              }
              break;
            }
          }
        }
      });

      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newBreakpoint =
            window.innerWidth <= 767
              ? "mobile"
              : window.innerWidth <= 1024
              ? "tablet"
              : "desktop";

          if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;

            ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));

            imageLoader.clearCache();

            sectionData = buildSectionData();

            loaderContainer.style.display = "flex";
            loaderContainer.classList.remove("fade-out");
            loaderContainer.classList.add("show");

            if (percentDisplay) {
              percentDisplay.textContent = "0%";
            }

            initializeSequences();
          } else {
            sections.forEach((section) => {
              const canvas = section.querySelector(".image-sequence-canvas");
              if (canvas) {
                resizeCanvas(canvas);
              }
            });
          }
        }, 250);
      });
    }

    document.querySelector("body")?.classList.add("page-loaded");
  },
  false
);

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openVideoBtn");
  const modal = document.getElementById("videoModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalVideoContainer = document.querySelector(".modal-video-container");

  const vimeoId = openBtn?.dataset.vimeoId;
  if (!vimeoId) {
    return;
  }

  const baseVimeoUrl = `https://player.vimeo.com/video/${vimeoId}`;

  openBtn.addEventListener("click", () => {
    openModal(vimeoId);
  });

  function openModal() {
    modalVideoContainer.classList.add("loading");

    const iframe = document.createElement("iframe");
    iframe.src = `${baseVimeoUrl}?autoplay=1&loop=0&byline=0&title=0&muted=0`;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen");
    iframe.setAttribute("allowfullscreen", "");

    iframe.addEventListener("load", () => {
      modalVideoContainer.classList.remove("loading");
    });

    modalVideoContainer.innerHTML = '<div class="loader"></div>';
    modalVideoContainer.appendChild(iframe);

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.style.display = "block";
    }
  }

  function closeModal() {
    modalVideoContainer.innerHTML = "";
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.style.display = "none";
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  modal?.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      closeModal();
    }
  });
});
