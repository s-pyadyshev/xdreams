export const toggle = (() => {
  const init = () => {
    const collapseLinks = document.querySelectorAll("[data-collapse-target]");

    if (!collapseLinks.length) {
      return;
    }

    collapseLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const collapseTarget = event.target.dataset.collapseTarget;
        const collapseGroup = event.target.dataset.collapseGroup;

        const target = document.querySelector(
          `[data-collapse-content="${collapseTarget}"]`
        );
        const associatedLinks = document.querySelectorAll(
          `[data-collapse-target="${collapseTarget}"]`
        );

        target.classList.toggle("active");
        associatedLinks.forEach((el) => el.classList.toggle("active"));

        if (collapseGroup) {
          const otherGroupToggles = document.querySelectorAll(
            `[data-collapse-group="${collapseGroup}"]`
          );

          otherGroupToggles.forEach((toggle) => {
            if (toggle.dataset.collapseTarget !== collapseTarget) {
              toggle.classList.remove("active");

              const otherContent = document.querySelector(
                `[data-collapse-content="${toggle.dataset.collapseTarget}"]`
              );
              if (otherContent) {
                otherContent.classList.remove("active");
              }
            }
          });
        }
      });
    });
  };

  return {
    init,
  };
})();
