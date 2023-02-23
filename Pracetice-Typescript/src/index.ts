import { renderDefaultTasks } from "./Render/renderDefaultTask";
import {
  createTask,
  delTask,
  editTask,
  getInfCurTask,
  cnclEditTask,
  searchTask,
  sortTableByTD,
  filterTask,
} from "./method/methodTask";
renderDefaultTasks();

let createTaskBtn = <HTMLButtonElement>document.getElementById("createTask");
createTaskBtn.addEventListener("click", (e: Event) => createTask());

let table: any = document.getElementById("tb");
table.addEventListener("click", function (event: any) {
  if (event.target.classList.contains("btn-delTask")) {
    let row: any = event.target.closest("tr");
    let firstTD: any = row.querySelector("td:nth-child(1)");
    delTask(+firstTD.innerText);
    row.remove();
  }
  if (event.target.classList.contains("btn-getInfCurTask")) {
    let row: any = event.target.closest("tr");
    let firstTD: any = row.querySelector("td:nth-child(1)");
  }
  if (event.target.classList.contains("btn-getInfCurTask")) {
    let row = event.target.closest("tr");
    let fiveTD = row.querySelector("td:nth-child(5)");
    getInfCurTask(fiveTD.querySelector("button").dataset.test);
  }
});

let editTaskBtn = <HTMLButtonElement>document.getElementById("editTask");
editTaskBtn.addEventListener("click", (e: Event) => editTask());

let cancelTaskBtn = <HTMLButtonElement>document.getElementById("cnclEditTask");
cancelTaskBtn.addEventListener("click", (e: Event) => cnclEditTask());

let searchTaskBtn = <HTMLButtonElement>document.getElementById("searchTask");
searchTaskBtn.addEventListener("click", (e: Event) => searchTask());

let sortTaskBtn = <HTMLButtonElement>document.getElementById("sortTaskBtn");
searchTaskBtn.addEventListener("click", (e: Event) => searchTask());

let filterTaskBtn = <HTMLButtonElement>document.getElementById("filterTask");
filterTaskBtn.addEventListener("click", (e: Event) => filterTask());

let sortTaskBar = <HTMLTableElement>document.getElementById("headerTbTask");
sortTaskBar.addEventListener("click", function (event: any) {
  if (event.target.classList.contains("sortTaskBtn")) {
    sortTableByTD(event.target.getAttribute("name"));
  }
});
