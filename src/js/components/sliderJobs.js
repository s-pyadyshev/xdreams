import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export const sliderJobs = (function () {
  const init = function () {
    const sliderJobs = new Swiper(".slider-jobs", {
      modules: [Navigation],
      navigation: {
        nextEl: ".slider-jobs__nav-btn--next",
        prevEl: ".slider-jobs__nav-btn--prev",
      },
      slidesPerView: 1.2,
      spaceBetween: 16,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2.2,
        },
        1200: {
          slidesPerView: 3.2,
        },
        1800: {
          slidesPerView: 4.5,
        },
        2300: {
          slidesPerView: 5.5,
        },
      },
    });
  };

  return {
    init,
  };
})();
