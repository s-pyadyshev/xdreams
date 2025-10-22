export const sliderSteps = (function () {
  // Mobile-first: base state assumes mobile layout
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

  // Mobile-first: base update logic (height animation)
  const updateMobileLayout = function () {
    state.elements.slides.forEach((slide, i) => {
      if (i === state.activeIndex) {
        slide.classList.add("steps-slider__slide-inner--active");
      } else {
        slide.classList.remove("steps-slider__slide-inner--active");
      }
    });
  };

  // Desktop-only: grid layout updates
  const updateDesktopLayout = function () {
    if (!state.isDesktop) return;

    // Reset container classes
    state.elements.container.className = "steps-slider";
    // Apply active state class for grid columns
    state.elements.container.classList.add(
      `steps-slider--active-${state.activeIndex}`
    );
  };

  // Shared logic for both layouts
  const updateSharedState = function () {
    // Update steps-slider-slide active class
    document.querySelectorAll(".steps-slider-slide").forEach((slide, i) => {
      slide.classList.toggle("slide-active", i === state.activeIndex);
    });

    // Update progress indicator (works on both layouts)
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

    // Mobile-first: always update mobile layout
    updateMobileLayout();

    // Conditionally update desktop layout
    if (state.isDesktop) {
      updateDesktopLayout();
    }

    // Always update shared state
    updateSharedState();
  };

  const checkLayout = function () {
    const isNowDesktop = window.innerWidth > 1400;
    if (isNowDesktop !== state.isDesktop) {
      state.isDesktop = isNowDesktop;
      // Re-apply layout when switching modes
      if (state.isDesktop) {
        updateDesktopLayout();
      } else {
        // On mobile, ensure we're using flex layout
        state.elements.container.className = "steps-slider";
      }
    }
  };

  const init = function () {
    const wrapper = document.querySelector("[data-steps-slider]");
    if (!wrapper) return;

    // Cache elements
    state.elements.wrapper = wrapper;
    state.elements.container = wrapper.querySelector("[data-slider-container]");
    state.elements.slides = wrapper.querySelectorAll(
      ".steps-slider__slide-inner"
    );
    state.elements.progressFill = wrapper.querySelector("[data-progress-fill]");
    state.elements.navPrev = wrapper.querySelector("[data-nav-prev]");
    state.elements.navNext = wrapper.querySelector("[data-nav-next]");

    state.totalSlides = state.elements.slides.length;

    // Initialize layout state
    checkLayout();
    setActiveSlide(0);

    // Event listeners
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

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        setActiveSlide(state.activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        setActiveSlide(state.activeIndex + 1);
      }
    });

    // Handle layout changes
    window.addEventListener("resize", checkLayout);
  };

  return {
    init,
  };
})();
