import { request } from "../api/request";
import { container } from "../store/store";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";
const addBtn = container?.querySelector(".add-btn") as HTMLButtonElement;

addBtn?.addEventListener("click", postTodo);

async function postTodo(e: Event) {
  e.preventDefault();
  const todoInput = container?.querySelector(".todo-input") as HTMLInputElement;
  const title = todoInput.value.trim();

  title.length === 0 &&
    addBtn.firstElementChild?.classList.contains("fa-plus") &&
    toastifyOpen("할 일을 적어주세요 😵", "#ff5252", "#f8f9fa");

  if (title && addBtn.firstElementChild?.classList.contains("fa-plus")) {
    toastifyOpen("할 일이 추가됐어요 😀", "#b2dfdb", "#212529");
    await request("todos", "post", {
      title,
    });

    todoInput.value = "";
    getTodos(await request("todos", "get"));
  }
}
