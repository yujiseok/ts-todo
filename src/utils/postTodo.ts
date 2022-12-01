import { request } from "../api/request";
import { container } from "../store/store";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";
const addBtn = container.querySelector(".add-btn");

addBtn.addEventListener("click", postTodo);

async function postTodo(e) {
  e.preventDefault();
  const todoInput = container.querySelector(".todo-input") as HTMLInputElement;
  let title = todoInput.value.trim();

  title.length === 0 &&
    toastifyOpen("할 일을 적어주세요 😵", "#ff5252", "#fff");

  if (title) {
    toastifyOpen("할 일이 추가됐어요 😀", "#b2dfdb");
    await request("todos", "post", {
      title,
    });

    todoInput.value = "";
    getTodos(await request("todos", "get"));
  }
}
