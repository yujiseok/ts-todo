import { request } from "../api/request";
import {
  container,
  doneFilter,
  modalContainer,
  orderFilter,
} from "../store/store";
import { ResponseValue } from "../typing";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const todos = await request("todos", "get");

export const getTodos = (todos: ResponseValue, done?, order?) => {
  const todoList = container.querySelector(".todo-list") as HTMLUListElement;
  todoList.innerHTML = "";
  if (done === "true") {
    todos = todos.filter((todo) => todo.done === true);
  }
  if (done === "false") {
    todos = todos.filter((todo) => todo.done === false);
  }
  if (order === "oldest") {
    todos = todos.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  todos.length > 0 &&
    todos.map(async (todo, i) => {
      const { id, order, title, done, createdAt, updatedAt } = todo;

      // draggableBox
      const draggableList = document.createElement("li");
      draggableList.classList.add("draggable-list");
      // draggableList.setAttribute("draggable", "true");

      // todoItem
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      todoItem.setAttribute("data-id", id);
      todoItem.setAttribute("data-createdat", createdAt);
      todoItem.setAttribute("data-updatedat", updatedAt);
      todoItem.setAttribute("data-order", (order + i).toString());

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
      editBtn.classList.add(`edit-btn`);

      btnWrapper.append(deleteBtn);
      btnWrapper.appendChild(editBtn);

      todoItem.append(checkTodo);
      todoItem.appendChild(btnWrapper);
      draggableList.append(todoItem);

      todoList.appendChild(draggableList);
    });

  const editBtns = container.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", modalHandler)
  );
};
function modalHandler(e) {
  const item = e.target as HTMLElement;
  const todo = item.parentElement?.parentElement as HTMLLIElement;

  const id = todo.dataset.id!;
  const done = todo.firstElementChild?.querySelector("input")?.checked!;
  const todoTitle = todo?.textContent!;
  const createdAt = dayjs(todo.dataset.createdat).format(
    "YYYY-MM-DD ddd요일 HH:mm:ss"
  );
  const updatedAt = dayjs(todo.dataset.updatedat).format(
    "YYYY-MM-DD ddd요일 HH:mm:ss"
  );
  const modalInput = modalContainer.querySelector(
    ".modal-input"
  ) as HTMLInputElement;
  const createdInfo = modalContainer.querySelector(
    ".createdAt"
  ) as HTMLSpanElement;
  const updatedInfo = modalContainer.querySelector(
    ".updatedAt"
  ) as HTMLSpanElement;

  modalInput.setAttribute("data-id", id);
  modalInput.setAttribute("data-done", `${!!done}`);
  createdInfo.textContent = createdAt!;
  updatedInfo.textContent = updatedAt!;
  modalContainer.classList.add("open");
  modalInput.focus();
  modalInput.value = todoTitle;
}
function doneFilterHandler() {
  // if (doneFilter.value === "all") {
  //   conditionalRender();
  // }
  // if (doneFilter.value === "true") {
  //   conditionalRender();
  // }
  // if (doneFilter.value === "false") {
  //   conditionalRender();
  // }

  switch (doneFilter.value) {
    case "all":
      conditionalRender();
      break;
    case "true":
      conditionalRender();
      break;
    case "false":
      conditionalRender();
      break;
    default:
      break;
  }
}
function orderFilterHandler() {
  // if (orderFilter.value === "none") {
  //   conditionalRender();
  // }
  // if (orderFilter.value === "newest") {
  //   conditionalRender();
  // }
  // if (orderFilter.value === "oldest") {
  //   conditionalRender();
  // }
  switch (orderFilter.value) {
    case "none":
      conditionalRender();
      break;
    case "newest":
      conditionalRender();
      break;
    case "oldest":
      conditionalRender();
      break;
    default:
      break;
  }
}
async function conditionalRender() {
  const todos = await request("todos", "get");
  getTodos(todos, doneFilter.value, orderFilter.value);
}

todos.length > 0 && getTodos(todos, doneFilter.value, orderFilter.value);
doneFilter.addEventListener("click", doneFilterHandler);
orderFilter.addEventListener("click", orderFilterHandler);
