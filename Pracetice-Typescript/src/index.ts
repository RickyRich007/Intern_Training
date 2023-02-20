type Task = {
  id: number;
  name: string;
  task: string;
  date: string;
};
//Lay tu local
const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return null;
  }
  return JSON.parse(localStorage.getItem(key));
};

const setToLocalStorage = (key: string, arrTask: Task[]): void => {
  localStorage.setItem(key, JSON.stringify(arrTask));
};

function initDefTask(): void {
  if (!getFromLocalStorage("toDoList")) {
    let arrTask: { id: number; name: string; task: string; date: string }[] = [
      { id: 1, name: "Giau", task: "Work", date: "2023-03-04" },
      { id: 2, name: "Anh", task: "Work", date: "2023-03-05" },
    ];
    setToLocalStorage("toDoList", arrTask);
  }
}
initDefTask();

function renderDefaultTasks(): void {
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  renderTask(arrTask);
}

renderDefaultTasks();

function setDataHTMLElement(data: any): string {
  return `${data}`;
}

function setTaskColumsElemnt(arrTask: Task[]): string[] {
  let columsTaskTable: string[] = [];
  console.log("string123", columsTaskTable);
  console.log(arrTask);
  for (let i: number = 0; i < arrTask.length; i++) {
    columsTaskTable.push(
      '<tr><td id="index">' +
        setDataHTMLElement(arrTask[i].id) +
        '</td><td id="nameintd">' +
        setDataHTMLElement(arrTask[i].name) +
        '</td><td id="taskintd">' +
        setDataHTMLElement(arrTask[i].task) +
        '</td><td id="dateintd">' +
        setDataHTMLElement(arrTask[i].date) +
        `</td><td><button data-test='${setDataHTMLElement(
          JSON.stringify(arrTask[i])
        )}'` +
        ' onclick="getInfCurTask(this)">Sửa</button></td>' +
        '<td><button onclick="delTask(' +
        setDataHTMLElement(arrTask[i].id) +
        ')">Xóa</button></td></tr>'
    );
  }
  return columsTaskTable;
}

function renderTask(arrTask: Task[]): void {
  let columsTaskTable: string[] = [];
  const headerTableElement =
    '<tr><td>STT<button onclick="sortTableByTD(0)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Tên<button onclick="sortTableByTD(1)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Công việc<button onclick="sortTableByTD(2)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Ngày làm<button onclick="sortTableByTD(3)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Sửa</td><td>Xóa</td></tr>';
  columsTaskTable.push(headerTableElement);
  columsTaskTable = columsTaskTable.concat(setTaskColumsElemnt(arrTask));
  console.log(columsTaskTable);
  let tb = <HTMLTableElement>document.getElementById("tb");
  tb.innerHTML = "";
  tb.innerHTML = columsTaskTable.join("");
}

const createTask = function (): void {
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  let name: string = (<HTMLInputElement>document.getElementById("name")).value;
  let task: string = (<HTMLInputElement>document.getElementById("task")).value;
  let date: string = (<HTMLInputElement>document.getElementById("date")).value;
  if (name != null && task != null && date != null) {
    let newTask: Task = {
      id: arrTask.length + 1,
      name: name,
      task: task,
      date: date,
    };
    arrTask.push(newTask);
    setToLocalStorage("toDoList", arrTask);
    window.location.reload();
  }
};

const delTask = function (id): void {
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  for (let i: number = 0; i < arrTask.length; i++) {
    if (arrTask[i].id == id) {
      arrTask.splice(i, 1);
      (<HTMLTableElement>document.getElementById("tb")).deleteRow(i + 1);
      i--;
    }
  }
  setToLocalStorage("toDoList", arrTask);
};

let curIdTask: number;
const editTask = function (): void {
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  for (let i = 0; i < arrTask.length; i++) {
    if (arrTask[i].id == curIdTask) {
      let name = (<HTMLInputElement>document.getElementById("name")).value;
      let task = (<HTMLInputElement>document.getElementById("task")).value;
      let date = (<HTMLInputElement>document.getElementById("date")).value;

      arrTask[i].name = name;
      arrTask[i].task = task;
      arrTask[i].date = date;
    }
  }
  setToLocalStorage("toDoList", arrTask);
  window.location.reload();
};

function getInfCurTask(self: any): void {
  let curTask = JSON.parse(self.dataset.test);
  document.getElementById("editTask").hidden = false;
  document.getElementById("cnclEditTask").hidden = false;
  document.getElementById("createTask").hidden = true;
  curIdTask = curTask.id;
  (<HTMLInputElement>document.getElementById("name")).value = curTask.name;
  (<HTMLInputElement>document.getElementById("task")).value = curTask.task;
  (<HTMLInputElement>document.getElementById("date")).value = curTask.date
    .split("/")
    .join("-");
}

function cnclEditTask() {
  (<HTMLInputElement>document.getElementById("name")).value = "";
  (<HTMLInputElement>document.getElementById("task")).value = "";
  (<HTMLInputElement>document.getElementById("date")).value = "";
  (<HTMLButtonElement>document.getElementById("editTask")).hidden = true;
  (<HTMLButtonElement>document.getElementById("cnclEditTask")).hidden = true;
  (<HTMLButtonElement>document.getElementById("createTask")).hidden = false;
}

function searchTask() {
  let word = (<HTMLInputElement>document.getElementById("search")).value;
  let curArrTask: Task[] = getFromLocalStorage("toDoList");
  let newarrTask: Task[] = [];
  for (let i = 0; i < curArrTask.length; i++) {
    if (curArrTask[i].task.includes(word)) {
      newarrTask.push(curArrTask[i]);
    }
  }
  (<HTMLTableElement>document.getElementById("tb")).innerHTML = "";
  let tr = [];
  tr.push("<tr><td>STT</td>");
  tr.push("<td>Tên</td>");
  tr.push("<td>Công việc</td>");
  tr.push("<td>Ngày làm</td>");
  tr.push("<td>Sửa</td>");
  tr.push("<td>Xóa</td></tr>");
  renderTask(newarrTask);
}

const SORT_FLAG = {
  id: 0,
  name: 1,
  task: 2,
  date: 3,
};

//Sắp xếp theo thuộc tính cột
var temp = false;
function sortTableByTD(flag): void {
  let arrTask = getFromLocalStorage("toDoList");
  if (flag === SORT_FLAG.id) {
    if (temp == true) {
      arrTask.sort((a, b) => b.id - a.id);
      temp = false;
    } else {
      arrTask.sort((a, b) => a.id - b.id);
      temp = true;
    }
  }
  if (flag === SORT_FLAG.name) {
    if (temp == true) {
      arrTask.sort((a, b) => b.name.localeCompare(a.name));
      console.log(arrTask);
      temp = false;
    } else {
      arrTask.sort((a, b) => a.name.localeCompare(b.name));
      temp = true;
    }
  }
  if (flag == SORT_FLAG.task) {
    if (temp == true) {
      arrTask.sort((a, b) => b.task.localeCompare(a.task));
      temp = false;
    } else {
      arrTask.sort((a, b) => a.task.localeCompare(b.task));
      temp = true;
    }
  }
  if (flag === SORT_FLAG.date) {
    if (temp == true) {
      arrTask.sort((a, b) => +new Date(b.date) - +new Date(a.date));
      temp = false;
    } else {
      arrTask.sort((a, b) => +new Date(a.date) - +new Date(b.date));
      temp = true;
    }
  }
  renderTask(arrTask);
}

function filterTask(): void {
  var learn = (<HTMLInputElement>document.getElementById("learn")).checked;
  var work = (<HTMLInputElement>document.getElementById("work")).checked;
  var goout = (<HTMLInputElement>document.getElementById("goout")).checked;
  var dochores = (<HTMLInputElement>document.getElementById("dochores"))
    .checked;

  var today = (<HTMLInputElement>document.getElementById("today")).checked;
  var tomorow = (<HTMLInputElement>document.getElementById("tomorow")).checked;
  var sevenDay = (<HTMLInputElement>document.getElementById("sevenDay"))
    .checked;
  var month = (<HTMLInputElement>document.getElementById("month")).checked;

  let curArrTask: Task[] = getFromLocalStorage("toDoList");
  let newArrTask: Task[] = [];
  for (let i = 0; i < curArrTask.length; i++) {
    if (learn) {
      if (curArrTask[i].task == "Learn") {
        newArrTask.push(curArrTask[i]);
      }
    }
    if (work) {
      if (curArrTask[i].task == "Work") {
        newArrTask.push(curArrTask[i]);
      }
    }
    if (goout) {
      if (curArrTask[i].task == "Goout") {
        newArrTask.push(curArrTask[i]);
      }
    }
    if (dochores) {
      if (curArrTask[i].task == "DoChores") {
        newArrTask.push(curArrTask[i]);
      }
    }
  }
  let Today = new Date().setHours(0, 0, 0, 0);
  for (let i = 0; i < newArrTask.length; i++) {
    let mydate = new Date(newArrTask[i].date).setHours(0, 0, 0, 0);
    if (today) {
      if (mydate != Today) {
        newArrTask.splice(i, 1);
        i--;
      }
    }
    if (tomorow) {
      if (mydate != Today + 86400000) {
        newArrTask.splice(i, 1);
        i--;
      }
    }
    if (sevenDay) {
      if (mydate < Today || Today + 7 * 86400000 < mydate) {
        newArrTask.splice(i, 1);
        i--;
      }
    }
    if (month) {
      if (mydate < Today || Today + 30 * 86400000 < mydate) {
        newArrTask.splice(i, 1);
        i--;
      }
    }
  }
  renderTask(newArrTask);
}
