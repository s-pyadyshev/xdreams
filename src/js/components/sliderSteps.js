import Swiper from "swiper";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";

export const sliderSteps = (function () {
  let thumbsSwiper = null;
  let mainSwiper = null;

  const updateProgressBar = function (swiper) {
    const progressFill = document.querySelector(
      ".slider-steps__progress-fill"
    );
    if (!progressFill) return;

    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;

    const segmentWidth = 100 / totalSlides;

    progressFill.style.width = `${segmentWidth}%`;
    progressFill.style.transform = `translateX(${currentIndex * 100}%)`;
  };

  const init = function () {
    const thumbsElement = document.querySelector(".slider-steps-show");
    const mainElement = document.querySelector(".slider-steps-hide");

    if (!thumbsElement || !mainElement) return;

    thumbsSwiper = new Swiper(".slider-steps-show", {
      modules: [Thumbs],
      direction: "vertical",
      slidesPerView: 4,
      spaceBetween: 16,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      multipleActiveThumbs: false,
      breakpoints: {
        1200: {
          direction: "horizontal",
        },
      },
    });

    mainSwiper = new Swiper(".slider-steps-hide", {
      modules: [Navigation, Thumbs,],
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: thumbsSwiper,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        multipleActiveThumbs: false,
        slidesPerView: 1,
      },
      on: {
        init: function (swiper) {
          updateProgressBar(swiper);
        },
        slideChange: function (swiper) {
          updateProgressBar(swiper);
        },
      },
    });
  };

  const destroy = function () {
    if (mainSwiper) {
      mainSwiper.destroy(true, true);
      mainSwiper = null;
    }
    if (thumbsSwiper) {
      thumbsSwiper.destroy(true, true);
      thumbsSwiper = null;
    }
  };

  return {
    init,
    destroy,
  };
})();
