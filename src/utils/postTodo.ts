import { request } from "../api/request";
import { container, doneFilter, orderFilter } from "../store/store";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";
const addBtn = container?.querySelector(".add-btn") as HTMLButtonElement;

addBtn?.addEventListener("click", postTodo);

async function postTodo(e: Event) {
  e.preventDefault();
  const todoInput = container?.querySelector(".todo-input") as HTMLInputElement;
  const title = todoInput.value.trim();

  title.length === 0 && toastifyOpen("할 일을 적어주세요 😵", "error");

  if (title.length > 0) {
    toastifyOpen("할 일이 추가됐어요 😀", "success");
    await request("todos", "post", {
      title,
    });
    todoInput.value = "";
  }

  getTodos(await request("todos", "get"), doneFilter.value, orderFilter.value);
}
