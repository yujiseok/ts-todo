import { request } from "../api/request";
import { container } from "../store/store";
import { ResponseValue } from "../typing";

const todos = await request("todos", "get");
const doneFilter = container?.querySelector(".done-filter");
const orderFilter = container?.querySelector(".order-filter");

export const getTodos = (todos: ResponseValue) => {
  const todoList = container.querySelector(".todo-list") as HTMLUListElement;
  todoList.innerHTML = "";
  todos.length > 0 &&
    todos.map((todo) => {
      const { id, order, title, done, createdAt } = todo;

      // todoItem
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.setAttribute("data-id", id);
      todoItem.setAttribute("data-createdAt", createdAt);
      todoItem.setAttribute("data-order", order.toString());

      // checkTodo
      const checkTodo = document.createElement("div");
      const checkbox = document.createElement("label");
      const checkInput = document.createElement("input");
      checkInput.setAttribute("type", "checkbox");

      if (done) {
        checkInput.checked = true;
        todoItem.classList.add("completed");
      }

      const checkboxIcon = document.createElement("span");
      const todoTitle = document.createElement("div");

      checkTodo.classList.add("check-todo");
      checkbox.classList.add("checkbox");
      checkboxIcon.classList.add("checkbox-icon");
      todoTitle.classList.add("todo-title");

      todoTitle.textContent = title;
      checkbox.append(checkInput);
      checkbox.appendChild(checkboxIcon);
      checkTodo.append(checkbox);
      checkTodo.appendChild(todoTitle);

      // btnWrapper
      const btnWrapper = document.createElement("div");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

      btnWrapper.classList.add("btn-wrapper");
      deleteBtn.classList.add("delete-btn");
      editBtn.classList.add("edit-btn");

      btnWrapper.append(deleteBtn);
      btnWrapper.appendChild(editBtn);

      todoItem.append(checkTodo);
      todoItem.appendChild(btnWrapper);

      todoList.appendChild(todoItem);
    });

  // const deleteAllbtn = document.querySelector(
  //   ".deleteAll-btn"
  // ) as HTMLButtonElement;

  // todos.length > 0 && (deleteAllbtn.style.display = "block");

  // editHandler();
  // deleteHandler();
};

todos.length > 0 ? getTodos(todos) : console.log("할일이 없는데?");

doneFilter?.addEventListener("click", async (e) => {
  const item = e.target as HTMLSelectElement;
  if (item.value === "all") {
    const todos = await request("todos", "get");
    getTodos(todos);
  }
  if (item.value === "true") {
    const todos = await request("todos", "get");
    const doneTodos = todos.filter((todo) => todo.done === true);
    getTodos(doneTodos);
  }
  if (item.value === "false") {
    const todos = await request("todos", "get");
    const notDoneTodos = todos.filter((todo) => todo.done === false);
    getTodos(notDoneTodos);
  }
});

orderFilter?.addEventListener("click", async (e) => {
  const item = e.target as HTMLSelectElement;

  if (item.value === "none") {
    const todos = await request("todos", "get");
    getTodos(todos);
  }
  if (item.value === "newest") {
    const todos = await request("todos", "get");
    getTodos(todos);
  }
  if (item.value === "oldest") {
    const todos = await request("todos", "get");
    const ascendingTodos = [...todos].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    getTodos(ascendingTodos);
  }
});

// function deleteHandler() {
//   const deleteBtns = document.querySelectorAll(".delete-btn");
//   deleteBtns.forEach((deleteBtn) => {
//     deleteBtn.addEventListener("click", (e) => {
//       const item = e.target as HTMLElement;
//       const todo = item.parentElement?.parentElement;
//       const id = todo?.dataset.id;
//       todo?.classList.add("delete");

//       todo?.addEventListener(
//         "transitionend",
//         async () => {
//           todo.remove();
//           await request(`todos/${id}`, "delete");
//         },
//         { once: true }
//       );
//       toastifyOpen("할 일이 삭제됐어요 👻", "#ff5252", "#fff");
//     });
//   });
// }

// function editHandler() {
//   const editBtns = document.querySelectorAll(".edit-btn");
//   editBtns.forEach((editBtn) => {
//     editBtn.addEventListener("click", (e) => {
//       let done = true;
//       const item = e.target as HTMLElement;

//       const todo = item.parentElement?.parentElement as HTMLLIElement;
//       const todoTitle = todo.childNodes[0].childNodes[1];
//       const todoInput = document.querySelector(
//         ".todo-input"
//       ) as HTMLInputElement;
//       const addBtn = document.querySelector(".add-btn") as HTMLButtonElement;
//       const id = todo.dataset.id;

//       todoInput.focus();
//       todoInput.value = todoTitle.textContent;
//       addBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

//       if (addBtn.firstElementChild?.classList.contains("fa-pen-to-square")) {
//         addBtn.addEventListener("click", async () => {
//           if (!todo.classList.contains("completed")) {
//             done = false;
//           }
//           if (todoInput.value.length === 0) {
//             toastifyOpen("할 일을 적어주세요 😵", "#ff5252", "#fff");
//             return;
//           }
//           await request(`todos/${id}`, "put", {
//             title: todoInput.value,
//             done,
//           });
//           addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
//           todoInput.value = "";
//           toastifyOpen("할 일이 수정됐어요 😀", "#b2dfdb", "#212529");

//           const todos = await request("todos", "get");
//           todos.length > 0 && getTodos(todos);
//         });
//       }
//     });
//   });
// }
