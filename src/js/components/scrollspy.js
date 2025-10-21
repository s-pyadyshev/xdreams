import { throttle, isElementInViewport } from "../helpers.js";

const applyScrollspyClasses = (elements) => {
  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      const animationClass = element.dataset.scrollspy;
      const animationDurationTime = element.dataset.durationtime;
      const animationDelayTime = element.dataset.delaytime;

      element.classList.add("animate__animated");

      if (animationClass) {
        element.classList.add(animationClass);
      }

      let style = "";
      if (animationDurationTime) {
        style += `animation-duration: ${animationDurationTime}ms;`;
      }
      if (animationDelayTime) {
        style += `animation-delay: ${animationDelayTime}ms;`;
      }

      if (style) {
        element.style.cssText += style;
      }
    }
  });
};

export const scrollspy = (function () {
  const init = function () {
    const scrollspyElements = document.querySelectorAll("[data-scrollspy]");

    if (!scrollspyElements.length) {
      return;
    }

    applyScrollspyClasses(scrollspyElements);

    document.addEventListener(
      "scroll",
      throttle(() => {
        applyScrollspyClasses(scrollspyElements);
      }, 500)
    );
  };

  return {
    init,
  };
})();
