getLocalData = async function () {
  const saveToDoData = localStorage.getItem("todoData");
  const idCounter = localStorage.getItem("idCounter") || 0;
  if (!saveToDoData) {
    const res = await axios.get("/data.json");
    data = res.data;
    saveData(data, res.data.currentTodo.length);
    displayLocalData(data.currentTodo);
  } else {
    const parsedData = JSON.parse(saveToDoData);
    displayLocalData(parsedData.currentTodo);
  }
};

displayLocalData = function (data) {
  data.forEach((element) => {
    newToDo(element);
  });
  updateItems();
};

saveData = function (parseData, lastIndex) {
  localStorage.setItem("todoData", JSON.stringify(parseData));
  if (lastIndex) {
    localStorage.setItem("idCounter", lastIndex);
  }
};

sortData = function () {
  const allTodoList = document.querySelectorAll(".draggable");
  const newSorteData = {
    currentTodo: [],
  };
  allTodoList.forEach((todo) => {
    let todoInfo = todo.querySelector("[data-todo-info]");
    newSorteData.currentTodo.push({
      id: parseInt(todo.getAttribute("id")),
      todo: `${todoInfo.textContent}`,
      isDone: parseInt(todo.getAttribute("done")),
    });
  });
  saveData(newSorteData);
};
