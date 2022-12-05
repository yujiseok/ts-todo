import { request } from "../api/request";
import { container } from "../store/store";
import { toastifyOpen } from "./toast";
const deleteAllbtn = container.querySelector(
  ".deleteAll-btn"
) as HTMLButtonElement;

deleteAllbtn.addEventListener("click", deleteAll);

function deleteAll() {
  const todoItems = container.querySelectorAll(".todo-item");
  todoItems.forEach(async (todoItem) => {
    if (todoItem instanceof HTMLDivElement) {
      const id = todoItem.dataset.id;
      todoItem.classList.add("delete");
      todoItem.addEventListener("transitionend", async () => {
        todoItem.remove();
        await request(`todos/${id}`, "delete");
      });
    }
  });
  todoItems.length > 0
    ? toastifyOpen("할 일이 모두 삭제됐어요 💥", "error")
    : toastifyOpen("삭제할 할 일이 없습니다 ❗", "error");
}
