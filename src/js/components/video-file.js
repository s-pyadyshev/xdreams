export const videoFile = (function () {
  const init = function () {
    const video = document.querySelector(".video__file");

    if (!video) return;
    video.setAttribute("src", "video/video.mp4");
    video.play();
    video.addEventListener("playing", function () {}, false);
  };

  return {
    init,
  };
})();
