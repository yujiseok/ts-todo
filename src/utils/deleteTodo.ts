import { request } from "../api/request";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";

const todos = await request("todos", "get");
const deleteBtns = document.querySelectorAll(".delete-btn");
const deleteAllbtn = document.querySelector(
  ".deleteAll-btn"
) as HTMLButtonElement;

// deleteBtns.forEach((deleteBtn) => {
//   deleteBtn.addEventListener("click", delteTodo);
// });

deleteAllbtn.addEventListener("click", deleteAll);

// function delteTodo(e) {
//   const todoItem = e.target.parentNode.parentNode as HTMLLIElement;
//   const id = todoItem.dataset.id;
//   todoItem.classList.add("delete");

//   todoItem.addEventListener("transitionend", async () => {
//     todoItem.remove();
//     await request(`todos/${id}`, "delete");
//   });
//   toastifyOpen("할 일이 삭제됐어요 👻", "#ff5252", "#fff");
// }

function deleteAll() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem: HTMLLIElement) => {
    todoItem.classList.add("delete");
    const id = todoItem.dataset.id;
    todoItem.addEventListener("transitionend", async () => {
      todoItem.remove();
      await request(`todos/${id}`, "delete");
    });
  });
  todoItems.length > 0 &&
    toastifyOpen("할 일이 모두 삭제됐어요 💥", "#ff5252", "#fff");
}
