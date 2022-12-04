export const toastifyOpen = (text: string, className: string) => {
  const toastifyContainer = document.querySelector(
    ".toastify-container"
  ) as HTMLDivElement;
  const toastify = document.createElement("div") as HTMLDivElement;

  toastify.classList.add(`toastify`, className);

  toastify.textContent = text;
  toastifyContainer.childNodes.length < 6 &&
    toastifyContainer.appendChild(toastify);

  setTimeout(() => {
    // toastify.addEventListener("animationend", () => {
    toastify.remove();
    // });
  }, 2000);
};
