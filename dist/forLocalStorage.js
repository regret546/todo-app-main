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
};

saveData = function (parseData, lastIndex) {
  localStorage.setItem("todoData", JSON.stringify(parseData));
  if (lastIndex) {
    localStorage.setItem("idCounter", lastIndex);
  }
};
