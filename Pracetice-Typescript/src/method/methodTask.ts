import { renderTask } from "../Render/renderTask";
import { getFromLocalStorage, setToLocalStorage } from "./localStorage";
import { Task } from "../Interface/ITask";
import { SORT_FLAG } from "../Constant/constant";
import {
  letChangeHTMLElementTask,
  letChangeHTMLElementButtonTask,
} from "./assignElement";
function createTask(): void {
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  let name: string = (<HTMLInputElement>document.getElementById("name")).value;
  let task: string = (<HTMLInputElement>document.getElementById("task")).value;
  let date: string = (<HTMLInputElement>document.getElementById("date")).value;
  if (validateInput(name) && task != "" && date != "") {
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
}
function validateInput(data: string): boolean {
  let hasNumber: any = /\d/;
  if (data == "" || data.length > 20) {
    return false;
  } else if (hasNumber.test(data)) {
    return false;
  }
  return true;
}
function delTask(id: number): void {
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  for (let i: number = 0; i < arrTask.length; i++) {
    if (arrTask[i].id == id) {
      arrTask.splice(i, 1);
      (<HTMLTableElement>document.getElementById("tb")).deleteRow(i + 1);
      i--;
    }
  }
  setToLocalStorage("toDoList", arrTask);
}

let curIdTask: number;
function editTask(): void {
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
}

function getInfCurTask(dataTask: any): void {
  let curTask = JSON.parse(dataTask);
  letChangeHTMLElementButtonTask(false, false, true);
  curIdTask = curTask.id;
  letChangeHTMLElementTask(
    curTask.name,
    curTask.task,
    curTask.date.split("/").join("-")
  );
}

function cnclEditTask() {
  letChangeHTMLElementTask("", "", "");
  letChangeHTMLElementButtonTask(true, true, false);
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

//Sắp xếp theo thuộc tính cột
var temp = false;
function sortTableByTD(keyTaskObj: string): void {
  let arrTask = getFromLocalStorage("toDoList");
  if (temp == true) {
    arrTask.sort((a: any, b: any) => b[keyTaskObj] - a[keyTaskObj]);
    temp = false;
  } else {
    arrTask.sort((a: any, b: any) => a[keyTaskObj] - b[keyTaskObj]);
    temp = true;
  }
  setToLocalStorage("toDoList", arrTask);
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
export {
  createTask,
  delTask,
  editTask,
  getInfCurTask,
  cnclEditTask,
  searchTask,
  sortTableByTD,
  filterTask,
};
