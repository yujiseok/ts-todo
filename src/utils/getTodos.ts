import { request } from "../api/request";
import { container } from "../store/store";
import { ResponseValue } from "../typing";

const todos = await request("todos", "get");
const doneFilter = container.querySelector(".done-filter");
const orderFilter = container.querySelector(".order-filter");

export const getTodos = (todos: ResponseValue) => {
  const todoList = document.querySelector(".todo-list");
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
      // done ? (checkInput.checked = true) : (checkInput.checked = false);

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
};

todos.length > 0 ? getTodos(todos) : console.log("할일이 없는데?");

doneFilter.addEventListener("click", async (e) => {
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

orderFilter.addEventListener("click", async (e) => {
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

// const editBtns = document.querySelectorAll(".edit-btn");

// editBtns.forEach((editBtn) => {
//   editBtn.addEventListener("click", editTodo);
// });

// async function editTodo(e) {
//   const todoItem = e.target.parentNode.parentNode as HTMLLIElement;
//   const id = todoItem.dataset.id;
//   const todoInput = document.querySelector(".todo-input") as HTMLInputElement;
//   const addBtn = document.querySelector(".add-btn");
//   let isDone = true;

//   console.log("clicked");

//   todoInput.focus();
//   todoInput.value = todoItem.textContent;
//   addBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

//   todoItem.classList.toggle("completed");

//   if (addBtn.firstElementChild.classList.contains("fa-pen-to-square")) {
//     addBtn.addEventListener("click", async () => {
//       await request(`todos/${id}`, "put", {
//         title: todoInput.value,
//         done: true,
//       });
//       addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
//     });
//   }
// }
