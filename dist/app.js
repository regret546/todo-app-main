/* for dark/light mode */
const toggleTheme = document.querySelector("#toggle-theme");
toggleTheme.addEventListener("click", function () {
  const pathElement = toggleTheme.querySelector("path");
  const header = document.body.querySelector("#header");
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    header.classList.remove(
      "bg-[url('/images/bg-mobile-dark.jpg')]",
      "md:bg-[url('/images/bg-desktop-dark.jpg')]"
    );
    document.body.classList.add("light");
    header.classList.add(
      "bg-[url('/images/bg-mobile-light.jpg')]",
      "md:bg-[url('/images/bg-desktop-light.jpg')]"
    );
    pathElement.setAttribute(
      "d",
      "M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
    );
  } else {
    document.body.classList.remove("light");
    header.classList.remove(
      "bg-[url('/images/bg-mobile-light.jpg')]",
      "md:bg-[url('/images/bg-desktop-light.jpg')]"
    );
    document.body.classList.add("dark");
    header.classList.add(
      "bg-[url('/images/bg-mobile-dark.jpg')]",
      "md:bg-[url('/images/bg-desktop-dark.jpg')]"
    );
    pathElement.setAttribute(
      "d",
      "M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
    );
  }
});

/* todo form */
/* new */
const todoCard = document.querySelector("[data-user-todo]");
const todoCardContainer = document.querySelector("#todo-list");
function newToDo(input) {
  if (!input.todo.trim()) {
    return;
  }

  const card = todoCard.content.cloneNode(true).children[0];
  const todoInfo = card.querySelector("[data-todo-info]");
  card.setAttribute("id", input.id);
  todoInfo.textContent = input.todo;
  if (input.isDone === 1) {
    finishToDo(card);
  }
  todoCardContainer.append(card);
}
const todoInputForm = document.querySelector("#input-form");
todoInputForm.addEventListener("submit", function (e) {
  const idCounter = localStorage.getItem("idCounter") || 0;
  const saveToDoData = localStorage.getItem("todoData");
  e.preventDefault();
  const userInput = this.querySelector("#userInput").value;
  const parseData = saveToDoData
    ? JSON.parse(saveToDoData)
    : {
        currentTodo: [],
      };
  lastIndex = parseInt(idCounter) + 1;
  const newTodo = {
    id: lastIndex - 1,
    todo: userInput,
    isDone: 0,
  };
  parseData.currentTodo.push(newTodo);
  saveData(parseData, lastIndex);
  newToDo(newTodo);
  this.querySelector("#userInput").value = "";
  this.querySelector("#userInput").blur();
});

/* delete */
function deleteToDo(currentToDo) {
  const saveToDoData = localStorage.getItem("todoData");
  const parseData = JSON.parse(saveToDoData);
  const currentToDoContainer = currentToDo.closest(".list-body");
  const updatedTodos = parseData.currentTodo.filter(
    (todo) => parseInt(todo.id) !== parseInt(currentToDoContainer.id)
  );
  parseData.currentTodo = updatedTodos;
  saveData(parseData);
  currentToDoContainer.remove();
}

/* finish */
function finishToDo(currentToDo) {
  const currentToDoContainer = currentToDo.closest(".list-body");
  const imageContainer = currentToDoContainer.querySelector(".checkbox");
  const currentToDoID = parseInt(currentToDoContainer.id);
  let saveToDoData = localStorage.getItem("todoData");
  let parseData = JSON.parse(saveToDoData);
  const todos = parseData.currentTodo;
  todos.forEach((todo) => {
    if (todo.id === currentToDoID) {
      todo.isDone = 1;
    }
  });
  saveData(parseData);
  if (!imageContainer.classList.contains("bg-gradient-to-br")) {
    const checkImage = document.createElement("img");
    checkImage.src = "/images/icon-check.svg";
    imageContainer.append(checkImage);
    imageContainer.classList.add(
      "animate-fade-down",
      "bg-gradient-to-br",
      "from-linear-gradient-from",
      "to-linear-gradient-to"
    );
    currentToDoContainer
      .querySelector("[data-todo-info]")
      .classList.add("line-through", "text-border-color");
  }
}

/* drag and drop */
document.addEventListener("DOMContentLoaded", function () {
  const draggablesTodo = document.querySelectorAll(".list-body");
  draggablesTodo.forEach((draggable) => {
    draggable.addEventListener("dragstart", function (event) {
      setTimeout(() => draggable.classList.add("dragging"), 0);
    });

    draggable.addEventListener("dragend", function (event) {
      draggable.classList.remove("dragging");
    });
  });
});
todoCardContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggable = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(todoCardContainer, e.clientY);

  console.log(afterElement);
  if (afterElement == null) {
    todoCardContainer.appendChild(draggable);
  } else {
    todoCardContainer.insertBefore(draggable, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

getLocalData();
