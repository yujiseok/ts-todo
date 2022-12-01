import { request } from "../api/request";

const todos = await request("todos", "get");

// todos.forEach((todo) => {
//   request(`todos/${todo.id}`, "delete");
// });
