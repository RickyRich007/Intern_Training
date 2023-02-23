import { Task } from "../Interface/ITask";
import { getFromLocalStorage, setToLocalStorage } from "../method/localStorage";
import { renderTask } from "./renderTask";
function initDefTask(): void {
  if (!getFromLocalStorage("toDoList")) {
    let arrTask: { id: number; name: string; task: string; date: string }[] = [
      { id: 1, name: "Giau", task: "Work", date: "2023-03-04" },
      { id: 2, name: "Anh1", task: "Work", date: "2023-03-05" },
    ];
    for (const key in arrTask[0]) {
      console.log(key);
    }
    setToLocalStorage("toDoList", arrTask);
  }
}
function renderDefaultTasks(): void {
  initDefTask();
  let arrTask: Task[] = getFromLocalStorage("toDoList");
  renderTask(arrTask);
}
export { renderDefaultTasks };
