import { request } from "../api/request";
import { container, modalContainer } from "../store/store";
import { ResponseValue } from "../typing";

const todos = await request("todos", "get");
const doneFilter = container?.querySelector(".done-filter");
const orderFilter = container?.querySelector(".order-filter");

export const getTodos = (todos: ResponseValue) => {
  const todoList = container.querySelector(".todo-list") as HTMLUListElement;
  todoList.innerHTML = "";
  todos.length > 0 &&
    todos.map(async (todo) => {
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
      editBtn.classList.add(`edit-btn`);

      btnWrapper.append(deleteBtn);
      btnWrapper.appendChild(editBtn);

      todoItem.append(checkTodo);
      todoItem.appendChild(btnWrapper);

      todoList.appendChild(todoItem);
    });
  const editBtns = container.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", (e) => {
      const item = e.target as HTMLElement;
      const id = item.parentElement?.parentElement?.dataset.id!;
      const done =
        item.parentElement?.parentElement?.firstElementChild?.querySelector(
          "input"
        )?.checked!;
      const todoTitle =
        item.parentElement?.parentElement?.firstChild?.lastChild?.textContent!;
      const modalInput = modalContainer.querySelector(
        ".modal-input"
      ) as HTMLInputElement;

      modalInput.setAttribute("data-id", id);
      modalInput.setAttribute("data-done", `${!!done}`);

      modalContainer.classList.add("open");
      modalInput.focus();
      modalInput.value = todoTitle;
    })
  );
};

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

todos.length > 0 && getTodos(todos);
