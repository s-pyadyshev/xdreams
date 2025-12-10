import { createSliderManager } from "./sliderMenu.js";

export const mobileMenu = (() => {
  const init = () => {
    const mobileMenuToggle = document.querySelector(".js-toggle-menu");

    if (!mobileMenuToggle) {
      return;
    }

    const menu = document.querySelector(".menu");
    const body = document.querySelector("body");
    const menuItems = document.querySelectorAll(".menu__item");
    const menuLinks = document.querySelectorAll(".menu__link");
    const menuContents = document.querySelectorAll(
      ".menu__content > li[data-collapse-content"
    );
    const sliderMenu = createSliderManager("[class*='slider-menu']");

    const openMenu = () => {
      menu.classList.add("active");
      mobileMenuToggle.classList.add("active");
      body.classList.toggle("menu-active");
      menu.classList.add("menu--open");
      menuItems[0].classList.add("active");
      menuLinks[0].classList.add("active");
      menuContents[0].classList.add("active");
      sliderMenu.init();
    };

    const closeMenu = () => {
      menu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      body.classList.toggle("menu-active");
      menu.classList.remove("menu--open");
      menuItems.forEach((item) => item.classList.remove("active"));
      menuLinks.forEach((item) => item.classList.remove("active"));
      menuContents.forEach((item) => item.classList.remove("active"));
      sliderMenu.destroy();
    };

    mobileMenuToggle.addEventListener("click", function () {
      if (!mobileMenuToggle.classList.contains("active")) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  };

  return {
    init,
  };
})();
