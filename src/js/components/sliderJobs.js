import { auto } from "@popperjs/core";
import Swiper from "swiper";

export const sliderJobs = (function () {
  const init = function () {
    const sliderJobs = new Swiper(".slider-jobs", {
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
