import { request } from "../api/request";
import { doneFilter, modalContainer, orderFilter } from "../store/store";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";

const closeBtn = modalContainer.querySelector(".close-btn");
closeBtn?.addEventListener("click", closeModalHandler);

const modalEditBtn = modalContainer.querySelector(".modal-edit-btn");
modalEditBtn?.addEventListener("click", modalEditHandler);

function closeModalHandler() {
  const modalInput = modalContainer.querySelector(
    ".modal-input"
  ) as HTMLInputElement;

  modalContainer?.classList.remove("open");
  modalInput.value = "";
}

async function modalEditHandler(e) {
  e.preventDefault();
  const modalInput = modalContainer.querySelector(
    ".modal-input"
  ) as HTMLInputElement;
  const id = modalInput.dataset.id;
  const datasetDone = modalInput.dataset.done;
  const title = modalInput.value.trim();
  const done = datasetDone === "true";

  if (title.length > 0) {
    await request(`todos/${id}`, "put", {
      title,
      done,
    });
    modalInput.value = "";
    modalContainer?.classList.remove("open");
    toastifyOpen("할 일이 수정됐어요 😀", "success");
  }

  title.length === 0 && toastifyOpen("할 일을 적어주세요 😵", "error");
  const todos = await request("todos", "get");
  getTodos(todos, doneFilter.value, orderFilter.value);
}
