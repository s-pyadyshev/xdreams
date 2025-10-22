import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const sliderValues = (function () {

    const updateProgressBar = function (swiper) {
    const progressFill = document.querySelector(
        ".slider-values__progress-fill"
    );
    if (!progressFill) return;

    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;

    const segmentWidth = 100 / totalSlides;

    progressFill.style.width = `${segmentWidth}%`;
    progressFill.style.transform = `translateX(${currentIndex * 100}%)`;
};


    const init = function () {
        const slider = new Swiper(".slider-values", {
            modules: [Navigation, Pagination],
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".slider-values__pagination",
                clickable: "true",
                type: "bullets",
                bulletElement: "button",
            },
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1025: {
                    slidesPerView: 3,
                    spaceBetween: 80
                },
                1600: {
                    slidesPerView: 4,
                    spaceBetween: 40
                }
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

    return {
        init,
    };
})();
