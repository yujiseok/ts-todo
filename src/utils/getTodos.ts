import { request } from "../api/request";
import { ResponseValue } from "../typing";

const todos = await request("todos", "get");
const doneTodos = todos.filter((todo) => todo.done === true);
const notDoneTodos = todos.filter((todo) => todo.done === false);
const ascendingTodos = [...todos].sort(
  (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
);

// console.log("normal : ", todos);
// console.log("doneTodos : ", doneTodos);
// console.log("notDoneTodos : ", notDoneTodos);
// console.log("ascendingTodos : ", ascendingTodos);

export const getTodos = (todos: ResponseValue) => {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
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
};

getTodos(todos);
