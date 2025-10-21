import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export const imageScroll = (function () {
  const init = function () {
    const frameCount = 147;
    const currentFrame = (index) =>
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
        index + 1
      )
        .toString()
        .padStart(4, "0")}.jpg`;

    // Preload images once and reuse
    const images = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Wait for DOM and images to load
    Promise.all([
      ...images.map((img) => {
        return new Promise((resolve) => {
          img.onload = img.onerror = resolve; // handle errors too
        });
      }),
      new Promise((resolve) => {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", resolve);
        } else {
          resolve();
        }
      }),
    ]).then(() => {
      initCanvases();
    });

    function initCanvases() {
      const sections = document.querySelectorAll(".canvas-section");
      const sectionHeight = window.innerHeight;

      sections.forEach((section, sectionIndex) => {
        const canvas = section.querySelector("canvas");

        // 🔴 Critical: Ensure canvas exists
        if (!canvas) {
          console.error(`Canvas not found in section ${sectionIndex + 1}`);
          return;
        }

        const ctx = canvas.getContext("2d");

        // Set canvas resolution and scale responsively
        function resizeCanvas() {
          canvas.width = 1158;
          canvas.height = 770;

          const scale = Math.min(
            window.innerWidth / 1158,
            window.innerHeight / 770
          );
          canvas.style.width = `${1158 * scale}px`;
          canvas.style.height = `${770 * scale}px`;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Initial size

        // Animation state
        const airpods = { frame: 0 };

        // Render current frame
        function render() {
          const frameIndex = Math.floor(airpods.frame);
          if (frameIndex >= 0 && frameIndex < frameCount) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
              images[frameIndex],
              0,
              0,
              canvas.width,
              canvas.height
            );
          }
        }

        // GSAP animation tied to scroll
        gsap.to(airpods, {
          frame: frameCount - 1,
          snap: { frame: 1 },
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            immediateRender: false,
            onEnter: () => {
              document.body.style.overflow = "hidden"; // lock scroll
            },
            onLeave: () => {
              if (
                sectionIndex < sections.length - 1 &&
                ScrollTrigger?.instances
              ) {
                // Unlock and jump to next section top
                document.body.style.overflow = "";
                setTimeout(() => {
                  window.scrollTo({
                    top: (sectionIndex + 1) * sectionHeight,
                    behavior: "auto",
                  });
                }, 50);
              }
            },
            onLeaveBack: () => {
              document.body.style.overflow = ""; // unlock when scrolling back
            },
            onUpdate: (self) => {
              airpods.frame = self.progress * (frameCount - 1);
              render();

              // Auto unlock and push forward after finish
              if (self.progress >= 1 && sectionIndex < sections.length - 1) {
                document.body.style.overflow = "";
              }
            },
          },
        });

        // Initial render
        render();
      });

      // Ensure body overflow is unlocked initially
      document.body.style.overflow = "";
    }
  };

  return { init };
})();
