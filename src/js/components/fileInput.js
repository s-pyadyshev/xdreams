export const fileInput = (() => {
  const init = () => {
    const fileInputs = document.querySelectorAll(".js-file-input");
    if (fileInputs.length === 0) return;

    fileInputs.forEach((item) => {
      const input = item.querySelector('input[type="file"]');
      const inputFilePlaceholder = item.querySelector(
        ".input-file__placeholder"
      );
      const inputFileName = item.querySelector(".input-file__name");

      if (!input) return;

      input.addEventListener("change", () => {
        const files = Array.from(input.files);

        if (files.length) {
          inputFilePlaceholder.classList.add("hidden");
          inputFileName.classList.remove("hidden");
        } else {
          inputFilePlaceholder.classList.remove("hidden");
          inputFileName.classList.add("hidden");
        }
        inputFileName.textContent =
          files.length === 0
            ? ""
            : files.length === 1
            ? files[0].name
            : `${files.length} files selected`;
      });
    });
  };

  return {
    init,
  };
})();
