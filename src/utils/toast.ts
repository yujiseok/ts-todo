export const toastifyOpen = (text: string, bg: string, color?: string) => {
  const toastifyContainer = document.querySelector(".toastify-container");
  const toastify = document.createElement("div");

  toastify.classList.add("toastify");
  toastify.style.backgroundColor = bg;
  toastify.style.color = color;
  toastify.textContent = text;
  toastifyContainer.childNodes.length < 6 &&
    toastifyContainer.appendChild(toastify);

  setTimeout(() => {
    // toastify.addEventListener("animationend", () => {
    toastify.remove();
    // });
  }, 2000);
};
