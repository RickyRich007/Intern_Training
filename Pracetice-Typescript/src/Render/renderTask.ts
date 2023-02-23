import { Task } from "../Interface/ITask";
function setDataHTMLElement(data: any): string {
  return `${data}`;
}

function setTaskColumsElemnt(arrTask: Task[]): string[] {
  let columsTaskTable: string[] = [];
  for (let i: number = 0; i < arrTask.length; i++) {
    columsTaskTable.push(
      '<tr class="taskItem"><td id="index">' +
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
        ' class="btn-getInfCurTask">Sửa</button></td>' +
        "<td><button data-id=" +
        setDataHTMLElement(arrTask[i].id) +
        ' class="btn-delTask">Xóa</button></td></tr>'
    );
  }
  return columsTaskTable;
}

function renderTask(arrTask: Task[]): void {
  let columsTaskTable: string[] = [];
  columsTaskTable = columsTaskTable.concat(setTaskColumsElemnt(arrTask));
  let contentTbTask = <HTMLTableElement>(
    document.getElementById("contentTbTask")
  );
  contentTbTask.innerHTML = "";
  contentTbTask.innerHTML = columsTaskTable.join("");
}
export { renderTask };
