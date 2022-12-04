import { request } from "../api/request";
import { container } from "../store/store";
import { getTodos } from "./getTodos";
import { toastifyOpen } from "./toast";

const todoList = container.querySelector(".todo-list");

todoList?.addEventListener("click", editHandler);

async function editHandler(e) {
  const item = e.target;
  let done = true;
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

  // if (item.classList[0] === "edit-btn") {
  //   console.log(item);
  //   const todo = item.parentElement?.parentElement as HTMLLIElement;
  //   const todoTitle = todo.childNodes[0].childNodes[1];
  //   const todoInput = container.querySelector(
  //     ".todo-input"
  //   ) as HTMLInputElement;
  //   const addBtn = container.querySelector(".add-btn") as HTMLButtonElement;
  //   const id = todo.dataset.id;

  //   todoInput.focus();
  //   todoInput.value = todoTitle.textContent!;
  //   addBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  //   if (addBtn.firstElementChild?.classList.contains("fa-pen-to-square")) {
  //     addBtn.addEventListener("click", async () => {
  //       if (!todo.classList.contains("completed")) {
  //         done = false;
  //       }
  //       if (todoInput.value.length === 0) {
  //         toastifyOpen("할 일을 적어주세요 😵", "error");
  //         return;
  //       }
  //       await request(`todos/${id}`, "put", {
  //         title: todoInput.value,
  //         done,
  //       });
  //       addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  //       todoInput.value = "";
  //       toastifyOpen("할 일이 수정됐어요 😀", "success");

  //       const todos = await request("todos", "get");
  //       console.log(todos);
  //       todos.length > 0 && getTodos(todos);
  //     });
  //   }
  // }

  if (item.classList[0] === "checkbox-icon") {
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

    toastifyOpen("할 일이 수정됐어요 😀", "success");
  }
}
