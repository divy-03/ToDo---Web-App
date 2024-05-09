import "./style.css";

// Created the interface of a todo
interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

// Created an array which will hold all todos
let todos: Todo[] = [];

// Imported all the HTML Elements required
const todosContainer = document.querySelector(".todosContainer") as HTMLElement;
const todoInput = document.getElementById("title") as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

// Load todos from localStorage on page load
window.addEventListener("load", () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodo();
  }
});

// On submitting form this function is called
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault(); // To prevent page reload 

  // Todo object with the previous interface is created with input
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };

  todos.push(todo); // Created todo object is pushed into the array
  todoInput.value = ""; // Value of input reset
  renderTodo(); 
  updateLocalStorage();
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  // Creating a checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      item.id === id ? (item.isCompleted = checkBox.checked) : "";
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
    todo.className = checkBox.checked ? "checkedTodo" : "todo";
    updateLocalStorage();
  };

  // Creating for Title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = checkBox.checked ? "textCut" : "";
  todo.className = checkBox.checked ? "checkedTodo" : "todo";

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  // Appending all to Todo
  todo.append(checkBox, paragraph, btn);
  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo();
  updateLocalStorage();
};

const renderTodo = () => {
  todosContainer.innerHTML = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};

const updateLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
