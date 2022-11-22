import { request } from "../api/request";

const addBtn = document.querySelector(".add-btn");
const toastifyContainer = document.querySelector(".toastify-container");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const filterOption = document.querySelector(".filter-todo");

const toastifyOpen = (text, color) => {
  const toastify = document.createElement("div");

  toastify.classList.add("toastify");
  toastify.style.backgroundColor = color;
  toastify.textContent = text;

  toastifyContainer.appendChild(toastify);

  setTimeout(() => {
    toastify.remove();
  }, 3000);
};

const getTodos = async () => {
  const todos = await request("todos", "get");
  console.log(todos);
  // const orderdTodo = todos.sort((a, b) => {
  //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });

  // console.log("순서", orderdTodo);

  todos.map((todo) => {
    const { id, order, title, done, createdAt } = todo;
    // todoItem
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.setAttribute("data-id", id);
    todoItem.setAttribute("data-createdAt", createdAt);

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
    const todoTitle = document.createElement("input");

    checkTodo.classList.add("check-todo");
    checkbox.classList.add("checkbox");
    checkboxIcon.classList.add("checkbox-icon");
    todoTitle.classList.add("todo-title");

    todoTitle.disabled = true;
    todoTitle.value = title;

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

getTodos();

const addTodo = async (event) => {
  event.preventDefault();

  // todoItem
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  // checkTodo
  const checkTodo = document.createElement("div");
  const checkbox = document.createElement("label");
  const checkInput = document.createElement("input");
  checkInput.setAttribute("type", "checkbox");
  const checkboxIcon = document.createElement("span");
  const todoTitle = document.createElement("input");

  checkTodo.classList.add("check-todo");
  checkbox.classList.add("checkbox");
  checkboxIcon.classList.add("checkbox-icon");
  todoTitle.classList.add("todo-title");

  todoTitle.disabled = true;
  todoTitle.value = todoInput.value;

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

  if (todoInput.value === "") {
    toastifyOpen("할 일을 적어주세요 😵", "#ff5252");
  }
  if (todoInput.value) {
    request("todos", "post", {
      title: todoInput.value,
    });
    todoList.appendChild(todoItem);
    toastifyOpen("할 일이 추가됐어요 😀", "#b2dfdb");
  }
  todoInput.value = "";
};

const deleteCheck = async (event) => {
  const item = event.target;

  // // delete
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement.parentElement;
    todo.classList.add("delete");
    todo.addEventListener("transitionend", () => {
      todo.remove();
      request(`todos/${todo.dataset.id}`, "delete");
    });
    toastifyOpen("할 일이 삭제됐어요 👻", "#ff5252");
  }

  // check
  if (item.classList[0] === "checkbox-icon") {
    const todo = item.parentElement.parentElement.parentElement;
    todo.classList.toggle("completed");
    request(`todos/${todo.dataset.id}`, "put", {
      title: "test",
      done: true,
    });
  }

  // edit
  if (item.classList[0] === "edit-btn") {
    const todoTitle = item.parentNode.parentNode.childNodes[0].childNodes[1];

    todoTitle.disabled = false;
    todoTitle.focus();

    console.log(document.activeElement !== todoTitle);
    if (document.activeElement !== todoTitle) {
      todoTitle.disabled = true;
      todoTitle.blur();
    }
  }
};

const filterTodo = (event) => {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    console.log(event.target.value);
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "true":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "false":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
