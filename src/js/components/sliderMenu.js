import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const createSliderManager = (selectorPattern) => {
  let swiperInstances = [];

  const init = function () {
    destroy();

    if (window.innerWidth < 1200) {
      const sliders = document.querySelectorAll(selectorPattern);

      sliders.forEach((sliderElement) => {
        const swiperInstance = new Swiper(sliderElement, {
          modules: [Navigation, Pagination],
          navigation: {
            nextEl: sliderElement.querySelector(".swiper-button-next"),
            prevEl: sliderElement.querySelector(".swiper-button-prev"),
          },
          pagination: {
            el: sliderElement.querySelector(".swiper-pagination"),
            clickable: true,
            type: "bullets",
            bulletElement: "button",
          },
          slidesPerView: 1.2,
          spaceBetween: 16,
        });

        swiperInstances.push(swiperInstance);
      });
    }
  };

  const destroy = function () {
    swiperInstances.forEach((instance) => {
      if (instance) {
        instance.destroy(true, true);
      }
    });
    swiperInstances = [];
  };

  const handleResize = function () {
    const needSwiper = window.innerWidth < 1200;

    if (needSwiper && swiperInstances.length === 0) {
      init();
    } else if (!needSwiper && swiperInstances.length > 0) {
      destroy();
    }
  };

  return {
    init: function () {
      init();
      window.addEventListener("resize", handleResize);
    },
    destroy: function () {
      destroy();
      window.removeEventListener("resize", handleResize);
    },
  };
};
