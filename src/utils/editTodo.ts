import { request } from "../api/request";
import { container, doneFilter, orderFilter } from "../store/store";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";

const todoList = container.querySelector(".todo-list");

todoList?.addEventListener("click", editHandler);

async function editHandler(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement?.parentElement;
    const id = todo?.dataset.id;
    todo?.classList.add("delete");

    todo?.addEventListener("transitionend", async () => {
      todo.remove();
      await request(`todos/${id}`, "delete");
    });

    toastifyOpen("할 일이 삭제됐어요 👻", "error");
  }

  if (item.classList[0] === "checkbox-icon") {
    let done = true;
    const todo = item.parentElement?.parentElement
      ?.parentElement as HTMLLIElement;
    const id = todo.dataset.id;
    const title = todo.childNodes[0].lastChild?.textContent!;
    todo.classList.toggle("completed");

    if (!todo.classList.contains("completed")) {
      done = false;
    }
    await request(`todos/${id}`, "put", {
      title,
      done,
    });

    setTimeout(async () => {
      getTodos(
        await request("todos", "get"),
        doneFilter.value,
        orderFilter.value
      );
    }, 500);

    toastifyOpen("할 일이 수정됐어요 😀", "success");
  }
}
