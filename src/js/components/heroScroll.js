export const heroScroll = (() => {
  const init = () => {
    const hero = document.querySelector(".hero");

    if (!hero) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        hero.classList.add("narrowed");
      } else {
        hero.classList.remove("narrowed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();
  };

  return {
    init,
  };
})();
