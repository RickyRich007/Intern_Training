import { Task } from "../Interface/ITask";
function getFromLocalStorage(key: string): any {
  let value = localStorage.getItem(key);
  if (typeof value === "string") {
    return JSON.parse(value);
  } else {
    return null;
  }
}

function setToLocalStorage(key: string, arrTask: Task[]): void {
  localStorage.setItem(key, JSON.stringify(arrTask));
}

export { getFromLocalStorage, setToLocalStorage };
