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
// import { imageScroll } from "./components/imageScroll.js";
import { scrollspy } from "./components/scrollspy.js";
// import { slider } from "./components/slider.js";

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

    const loaderContainer = document.querySelector(".image-sequence-loading");

    if (loaderContainer) {
      gsap.registerPlugin(ScrollTrigger);

      const sections = gsap.utils.toArray(".pin-section");

      let lastScrollTop = window.scrollY;
      let isSnapping = false;
      // let lastSectionActivated = false;

      loaderContainer.classList.add("show");

      let totalImages = 0;
      let loadedImages = 0;
      const allImagesLoaded = new Promise((resolve) => {
        const checkComplete = () => {
          if (loadedImages >= totalImages && totalImages > 0) {
            resolve();
          }
        };

        const originalImage = window.Image;
        window.Image = function () {
          const img = new originalImage();
          const originalOnload = img.onload;
          img.onload = function (...args) {
            loadedImages++;
            checkComplete();
            if (originalOnload) originalOnload.apply(this, args);
          };
          const originalOnerror = img.onerror;
          img.onerror = function (...args) {
            loadedImages++;
            checkComplete();
            if (originalOnerror) originalOnerror.apply(this, args);
          };
          return img;
        };
      });

      sections.forEach((section) => {
        const frameCount = parseInt(section.dataset.frameCount, 10) || 0;
        totalImages += frameCount;
      });

      window.addEventListener("scroll", () => {
        if (!isSnapping) {
          lastScrollTop = window.scrollY;
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
                  });
                }
              }
              break;
            }
          }
        }
      });

      function resizeCanvas(canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        const displayWidth = rect.width;
        const displayHeight = rect.height;

        if (displayWidth > 0 && displayHeight > 0) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        } else {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
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
      }) {
        const ctx = canvas.getContext("2d");
        let curFrame = -1;
        let playhead = { frame: 0 };

        const images = urls.map((url) => {
          const img = new Image();
          img.src = url;
          return img;
        });

        const updateImage = () => {
          const frame = Math.round(playhead.frame);
          if (frame !== curFrame && images[frame]?.complete) {
            drawImageCover(ctx, images[frame], canvas.width, canvas.height);
            curFrame = frame;
          }
        };

        const duration = images.length / effectiveFps;

        return gsap.to(playhead, {
          frame: images.length - 1,
          ease: "none",
          duration: duration,
          onUpdate: updateImage,
          onComplete: onComplete,
          scrollTrigger: scrollTrigger,
        });
      }

      allImagesLoaded.then(() => {
        requestAnimationFrame(() => {
          sections.forEach((section, index) => {
            const canvas = section.querySelector(".image-sequence-canvas");
            if (!canvas) return;

            resizeCanvas(canvas);

            const imagePath = section.dataset.imagePath;
            const firstImageUrl = `${imagePath}-001.jpg`;
            const img = new Image();
            img.src = firstImageUrl;

            const drawFirst = () => {
              const ctx = canvas.getContext("2d");
              drawImageCover(ctx, img, canvas.width, canvas.height);
            };

            if (img.complete) {
              drawFirst();
            } else {
              img.onload = drawFirst;
            }
          });

          loaderContainer.classList.add("fade-out");
          setTimeout(() => {
            loaderContainer.style.display = "none";
          }, 500);
        });
      });

      sections.forEach((section, index) => {
        const frameCount = parseInt(section.dataset.frameCount, 10);
        const imagePath = section.dataset.imagePath;
        const urls = Array.from(
          { length: frameCount },
          (_, i) => `${imagePath}-${(i + 1).toString().padStart(3, "0")}.jpg`
        );

        const canvas = section.querySelector(".image-sequence-canvas");
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
              onComplete: () => {
                // TODO (if desktop)
                nextSection.classList.remove("pin-section-in-transition");
                console.log(isLastSection);
                if (isLastSection) {
                  setTimeout(() => {
                    const menuLinkFirst = document
                      .querySelectorAll(".menu__item")[0]
                      ?.querySelector(".menu__link");
                    const menuContentFirst =
                      menuLinkFirst?.nextElementSibling?.querySelector("li");

                    menuLinkFirst?.classList.toggle("active");
                    menuContentFirst?.classList.toggle("active");
                  }, 2000);
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
        };

        // if (isLastSection) {
        //   scrollTriggerConfig.onEnter = (self) => {
        //     if (self.direction > 0) {
        //       lastSectionActivated = true;
        //     }
        //   };
        // }

        imageSequence({
          urls,
          canvas,
          scrollTrigger: scrollTriggerConfig,
          onComplete: handleComplete,
          effectiveFps: 15,
        });
      });

      window.addEventListener("resize", () => {
        sections.forEach((section) => {
          const canvas = section.querySelector(".image-sequence-canvas");
          if (canvas) {
            resizeCanvas(canvas);
          }
        });
      });
    }
    document.querySelector("body").classList.add("page-loaded");
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
