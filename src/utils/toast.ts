export const toastifyOpen = (text: string, bg: string, color?: string) => {
  const toastifyContainer = document.querySelector(".toastify-container");
  const toastify = document.createElement("div");

  toastify.classList.add("toastify");
  toastify.style.backgroundColor = bg;
  toastify.style.color = color;
  toastify.textContent = text;

  toastifyContainer.appendChild(toastify);

  setTimeout(() => {
    toastify.remove();
  }, 2000);
};
