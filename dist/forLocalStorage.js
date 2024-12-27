getLocalData = async function () {
  let saveToDoData = localStorage.getItem("todoData");
  if (!saveToDoData) {
    const res = await axios.get("/data.json");
    data = res.data;
    localStorage.setItem("todoData", JSON.stringify(data));
    saveToDoData = localStorage.getItem("todoData");
    displayLocalData(data.currentTodo);
  } else {
    const parsedData = JSON.parse(saveToDoData);
    displayLocalData(parsedData.currentTodo);
  }
};

displayLocalData = function (data) {
  data.forEach((element) => {
    console.log(element);
    newToDo(element);
  });
};
