function letChangeHTMLElementTask(
  eleName: string,
  eleTask: string,
  eleDate: string
): void {
  (<HTMLInputElement>document.getElementById("name")).value = eleName;
  (<HTMLInputElement>document.getElementById("task")).value = eleTask;
  (<HTMLInputElement>document.getElementById("date")).value = eleDate;
}
function letChangeHTMLElementButtonTask(
  editTask: boolean,
  cnclEditTask: boolean,
  createTask: boolean
): void {
  (<HTMLInputElement>document.getElementById("editTask")).hidden = editTask;
  (<HTMLInputElement>document.getElementById("cnclEditTask")).hidden =
    cnclEditTask;
  (<HTMLInputElement>document.getElementById("createTask")).hidden = createTask;
}
export { letChangeHTMLElementTask, letChangeHTMLElementButtonTask };
