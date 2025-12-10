import Swiper from "swiper";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";

export const sliderFeatures = (function () {
  let thumbsSwiper = null;
  let mainSwiper = null;

  const updateProgressBar = function (swiper) {
    const progressFill = document.querySelector(
      ".slider-features__progress-fill"
    );
    if (!progressFill) return;

    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;

    const segmentWidth = 100 / totalSlides;

    progressFill.style.width = `${segmentWidth}%`;
    progressFill.style.transform = `translateX(${currentIndex * 100}%)`;
  };

  const init = function () {
    const thumbsElement = document.querySelector(".slider-features__thumbs");
    const mainElement = document.querySelector(".slider-features__main");

    if (!thumbsElement || !mainElement) return;

    thumbsSwiper = new Swiper(".slider-features__thumbs", {
      modules: [Thumbs],
      direction: "vertical",
      slidesPerView: 4,
      spaceBetween: 0,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      multipleActiveThumbs: false,
      touchMoveStopPropagation: false,
      touchReleaseOnEdges: true,
    });

    mainSwiper = new Swiper(".slider-features__main", {
      modules: [Navigation, Thumbs, EffectFade],
      spaceBetween: 0,
      speed: 600,
      effect: "fade",
      allowTouchMove: false,
      navigation: {
        nextEl: ".slider-features__nav-btn--next",
        prevEl: ".slider-features__nav-btn--prev",
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
