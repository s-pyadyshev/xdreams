export const videoModal = (function () {
  const init = function () {
    document.addEventListener("DOMContentLoaded", () => {
      const video = document.getElementById("videoModal");

      if (!video) return;

      const openBtn = document.getElementById("openVideoBtn");
      const modal = document.getElementById("videoModal");
      const closeModalBtn = document.getElementById("closeModalBtn");
      const modalVideoContainer = document.querySelector(
        ".modal-video-container"
      );

      const vimeoId = openBtn?.dataset.vimeoId;
      if (!vimeoId) {
        return;
      }

      const baseVimeoUrl = `https://player.vimeo.com/video/${vimeoId}`;

      openBtn.addEventListener("click", () => {
        openModal(vimeoId);
      });

      function openModal() {
        modalVideoContainer.classList.add("loading");

        const iframe = document.createElement("iframe");
        iframe.src = `${baseVimeoUrl}?autoplay=1&loop=0&byline=0&title=0&muted=0`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen");
        iframe.setAttribute("allowfullscreen", "");

        iframe.addEventListener("load", () => {
          modalVideoContainer.classList.remove("loading");
        });

        modalVideoContainer.innerHTML = '<div class="loader"></div>';
        modalVideoContainer.appendChild(iframe);

        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.style.display = "block";
        }
      }

      function closeModal() {
        modalVideoContainer.innerHTML = "";
        if (typeof modal.close === "function") {
          modal.close();
        } else {
          modal.style.display = "none";
        }
      }

      if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
      }

      modal?.addEventListener("click", (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          closeModal();
        }
      });
    });
  };

  return {
    init,
  };
})();
