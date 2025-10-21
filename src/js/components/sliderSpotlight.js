import Swiper from "swiper";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";

export const sliderSpotlight = (function () {
  let thumbsSwiper = null;
  let mainSwiper = null;

  const getSlideDelay = (swiper, index) => {
    const slide = swiper.slides[index];
    if (slide?.dataset?.swiperAutoplay) {
      const delay = parseInt(slide.dataset.swiperAutoplay, 10);
      if (!isNaN(delay) && delay > 0) return delay;
    }
    return swiper.params.autoplay.delay || 5000;
  };

  const resetAllProgress = () => {
    const fills = document.querySelectorAll(".slider-spotlight__progress-fill");
    fills.forEach((fill) => {
      fill.style.transition = "none";
      fill.style.width = "0%";
    });
  };

  const startProgress = (swiper, index) => {
    resetAllProgress();

    const delay = getSlideDelay(swiper, index);
    const thumbSlides = document.querySelectorAll(
      ".slider-spotlight__thumb-slide"
    );
    const activeThumb = thumbSlides[index];
    if (!activeThumb) return;

    const fill = activeThumb.querySelector(".slider-spotlight__progress-fill");
    if (!fill) return;

    fill.style.transition = "none";
    fill.style.width = "0%";
    void fill.offsetWidth;
    fill.style.transition = `width ${delay}ms linear`;
    fill.style.width = "100%";
  };

  const init = () => {
    const thumbsEl = document.querySelector(".slider-spotlight__thumbs");
    const mainEl = document.querySelector(".slider-spotlight__main");

    if (!thumbsEl || !mainEl) return;

    if (mainSwiper) {
      mainSwiper.destroy(true, true);
      mainSwiper = null;
    }
    if (thumbsSwiper) {
      thumbsSwiper.destroy(true, true);
      thumbsSwiper = null;
    }

    thumbsSwiper = new Swiper(thumbsEl, {
      modules: [Thumbs],
      slidesPerView: 4,
      spaceBetween: 12,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    });

    mainSwiper = new Swiper(mainEl, {
      modules: [Navigation, Thumbs, EffectFade, Autoplay],
      spaceBetween: 0,
      speed: 600,
      effect: "fade",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".slider-spotlight__nav-btn--next",
        prevEl: ".slider-spotlight__nav-btn--prev",
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
      on: {
        init(swiper) {
          startProgress(swiper, swiper.activeIndex);
        },
        slideChange(swiper) {
          startProgress(swiper, swiper.activeIndex);
        },
      },
    });
  };

  const destroy = () => {
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
