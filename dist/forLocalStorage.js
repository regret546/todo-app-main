getLocalData = async function () {
  let saveToDoData = localStorage.getItem("todoData");
  let idCounter = localStorage.getItem("idCounter") || 0;
  if (!saveToDoData) {
    const res = await axios.get("/data.json");
    data = res.data;
    localStorage.setItem("idCounter", res.data.currentTodo.length);
    localStorage.setItem("todoData", JSON.stringify(data));
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
