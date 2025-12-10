export const headerScroll = (() => {
  const init = () => {
    const header = document.querySelector(".header");
    const logoText1 = document.querySelector(".logo-text-1");

    if (!header || !logoText1) return;

    let currentFill = null;

    // Configurable threshold: >60% dark → treat as dark background
    const DARKNESS_THRESHOLD = 0.6;

    // Debounce function to avoid excessive checks
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    function getBackgroundLuminance() {
      const rect = header.getBoundingClientRect();

      // Ensure we have visible dimensions
      if (rect.width === 0 || rect.height === 0) return 0.5;

      // Sample grid: 3x3 for better coverage
      const samplesX = [0.2, 0.5, 0.8]; // relative X positions
      const samplesY = [0.2, 0.5, 0.8]; // relative Y positions

      let darkPixelCount = 0;
      let totalSamples = 0;

      // Temporarily hide header to see behind it
      const oldPointerEvents = header.style.pointerEvents;
      header.style.pointerEvents = "none";

      try {
        for (const px of samplesX) {
          for (const py of samplesY) {
            const x = rect.left + rect.width * px;
            const y = rect.top + rect.height * py;

            const el = document.elementFromPoint(
              x - window.scrollX,
              y - window.scrollY
            );
            if (!el) continue;

            const style = getComputedStyle(el);
            const bgColor = style.backgroundColor;

            // Skip transparent pixels
            if (
              !bgColor ||
              bgColor === "transparent" ||
              bgColor === "rgba(0, 0, 0, 0)"
            ) {
              // Optional: go up the tree until non-transparent
              let parent = el.parentElement;
              while (parent && (!style || style.display === "none")) {
                const parentStyle = getComputedStyle(parent);
                const pBg = parentStyle.backgroundColor;
                if (pBg && pBg !== "transparent" && pBg !== "rgba(0,0,0,0)") {
                  style = parentStyle;
                  break;
                }
                parent = parent.parentElement;
              }
            }

            const rgbMatch = bgColor.match(
              /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
            );
            if (!rgbMatch) continue;

            const r = parseInt(rgbMatch[1]) / 255;
            const g = parseInt(rgbMatch[2]) / 255;
            const b = parseInt(rgbMatch[3]) / 255;

            // Relative luminance (per WCAG)
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            if (luminance < 0.5) darkPixelCount++;
            totalSamples++;
          }
        }
      } catch (e) {
        console.warn("Error reading background color:", e);
      } finally {
        header.style.pointerEvents = oldPointerEvents;
      }

      // Return fraction of dark samples
      return totalSamples > 0 ? darkPixelCount / totalSamples : 0.5; // default to neutral
    }

    function updateLogoColor() {
      const avgDarkRatio = getBackgroundLuminance();

      const shouldBeDarkBg = avgDarkRatio >= DARKNESS_THRESHOLD;
      const newFill = shouldBeDarkBg ? "#f5f5f5" : "#251163";

      // Only update if changed
      if (newFill !== currentFill) {
        logoText1.setAttribute("fill", newFill);
        currentFill = newFill;
      }
    }

    // Wrap in debounce (~100ms delay)
    const debouncedUpdate = debounce(updateLogoColor, 100);

    // Initial call
    updateLogoColor();

    // Listen for scroll and resize
    window.addEventListener("scroll", debouncedUpdate, { passive: true });
    window.addEventListener("resize", debouncedUpdate);
  };

  return { init };
})();
