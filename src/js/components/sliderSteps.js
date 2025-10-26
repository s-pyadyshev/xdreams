export const sliderSteps = (function () {
  let state = {
    activeIndex: 0,
    totalSlides: 0,
    isDesktop: false,
    elements: {
      wrapper: null,
      container: null,
      slides: null,
      progressFill: null,
      navPrev: null,
      navNext: null,
    },
  };

  const updateMobileLayout = function () {
    state.elements.slides.forEach((slide, i) => {
      if (i === state.activeIndex) {
        slide.classList.add("steps-slider__slide-inner--active");
      } else {
        slide.classList.remove("steps-slider__slide-inner--active");
      }
    });
  };

  const updateDesktopLayout = function () {
    if (!state.isDesktop) return;

    state.elements.container.className = "steps-slider";
    state.elements.container.classList.add(
      `steps-slider--active-${state.activeIndex}`
    );
  };

  const updateSharedState = function () {
    document.querySelectorAll(".steps-slider-slide").forEach((slide, i) => {
      slide.classList.toggle("slide-active", i === state.activeIndex);
    });

    const translateX = state.activeIndex * 100;
    state.elements.progressFill.style.transform = `translateX(${translateX}%)`;
  };

  const normalizeIndex = function (index) {
    if (index < 0) return state.totalSlides - 1;
    if (index >= state.totalSlides) return 0;
    return index;
  };

  const setActiveSlide = function (index) {
    state.activeIndex = normalizeIndex(index);

    updateMobileLayout();

    if (state.isDesktop) {
      updateDesktopLayout();
    }

    updateSharedState();
  };

  const checkLayout = function () {
    const isNowDesktop = window.innerWidth > 1199;
    if (isNowDesktop !== state.isDesktop) {
      state.isDesktop = isNowDesktop;
      if (state.isDesktop) {
        updateDesktopLayout();
      } else {
        state.elements.container.className = "steps-slider";
      }
    }
  };

  const init = function () {
    const wrapper = document.querySelector("[data-steps-slider]");
    if (!wrapper) return;

    state.elements.wrapper = wrapper;
    state.elements.container = wrapper.querySelector("[data-slider-container]");
    state.elements.slides = wrapper.querySelectorAll(
      ".steps-slider__slide-inner"
    );
    state.elements.progressFill = wrapper.querySelector("[data-progress-fill]");
    state.elements.navPrev = wrapper.querySelector("[data-nav-prev]");
    state.elements.navNext = wrapper.querySelector("[data-nav-next]");

    state.totalSlides = state.elements.slides.length;

    checkLayout();
    setActiveSlide(0);

    state.elements.slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        const index = parseInt(slide.getAttribute("data-slide-index"), 10);
        if (index !== state.activeIndex) {
          setActiveSlide(index);
        }
      });
    });

    state.elements.navPrev.addEventListener("click", () => {
      setActiveSlide(state.activeIndex - 1);
    });

    state.elements.navNext.addEventListener("click", () => {
      setActiveSlide(state.activeIndex + 1);
    });

    window.addEventListener("resize", checkLayout);
  };

  return {
    init,
  };
})();
