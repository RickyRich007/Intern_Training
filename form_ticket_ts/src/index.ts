import {
  TicketForm,
  ReCaptChaTicketForm,
  UpLoadFileTForm,
  FeatureBtnTicketForm,
} from "./component/cpnt-ticket-form.js";
import { getDataTicketForm } from "./api/get-data-field.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ITicketForm } from "./interface/ITicketForm.js";
import { ITicketField } from "./interface/ITicketField.js";
import { operationMapping } from "./method/object-mapping-render-ticket-form.js";
import { submittingTicketFormEvent } from "./method/submitting-form-ticket.js";
async function renderMainTicketForm(idTicketForm: string): Promise<void> {
  //mảng chứa các element
  let fieldsElementArr: HTMLElement[] = [];

  //cái này cái khung xương, có thể xoá làm cái khác .
  const skeleton = <HTMLElement>document.createElement("form");
  skeleton.className = "ticketsForm skeleton";
  const labelTemp = <HTMLElement>document.createElement("label");
  labelTemp.className = "labelTickForm";

  const inputTicketForm = <HTMLElement>document.createElement("input");
  inputTicketForm.className = "inputTicketForm skeleton";

  const inputTicketForm1 = <HTMLElement>document.createElement("input");
  inputTicketForm1.className = "inputTicketForm skeleton";

  const inputTicketForm2 = <HTMLElement>document.createElement("input");
  inputTicketForm2.className = "inputTicketForm skeleton";

  const inputTicketForm3 = <HTMLElement>document.createElement("input");
  inputTicketForm3.className = "inputTicketForm skeleton";
  const inputTicketForm4 = <HTMLElement>document.createElement("input");
  inputTicketForm4.className = "inputTicketForm skeleton";

  const inputTicketForm5 = <HTMLElement>document.createElement("input");
  inputTicketForm5.className = "inputTicketForm skeleton";
  const inputTicketForm6 = <HTMLElement>document.createElement("input");
  inputTicketForm6.className = "inputTicketForm skeleton";

  const inputTicketForm7 = <HTMLElement>document.createElement("input");
  inputTicketForm7.className = "inputTicketForm skeleton";

  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm1);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm2);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm3);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm4);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm5);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm6);
  skeleton.appendChild(labelTemp);
  skeleton.appendChild(inputTicketForm7);
  document.body.appendChild(skeleton);
  //

  //gọi lấy data chính của form
  let dataTicketForm: ITicketForm = await getDataTicketForm(idTicketForm);

  document.body.removeChild(skeleton);

  //renderFrm
  const ticketFrm = new TicketForm({
    id: dataTicketForm.id,
    name: dataTicketForm.name,
    title: dataTicketForm.title,
  });

  //renderFields, gọi key value function render
  dataTicketForm.fields.forEach((element: ITicketField) => {
    if (!element.section_mappings && !element.sections) {
      operationMapping[element.type as keyof typeof operationMapping](
        fieldsElementArr,
        element,
        dataTicketForm.fields!
      );
    }
  });

  const recaptcha = new ReCaptChaTicketForm();
  recaptcha.renderContent();
  fieldsElementArr.push(recaptcha.getElement());
  recaptcha.renderSpan();
  fieldsElementArr.push(recaptcha.getElement());

  const uploadfile = new UpLoadFileTForm();
  uploadfile.renderUFile();
  fieldsElementArr.push(uploadfile.getElement());

  const featurebtn = new FeatureBtnTicketForm();
  featurebtn.renderCnlBtn();
  fieldsElementArr.push(featurebtn.getElement());

  featurebtn.renderSubmitBtn();
  fieldsElementArr.push(featurebtn.getElement());

  fieldsElementArr.forEach((element) => {
    ticketFrm.getElement().appendChild(element);
  });
  document.body.appendChild(ticketFrm.getElement());

  //render editor dùng của CKEditor5
  const editor = ClassicEditor.create(
    document.querySelector(".desTicketForm") as HTMLElement,
    {
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "undo",
          "redo",
        ],
      },
      language: "en",
    }
  );
  //tạo recaptcha của google
  const script = document.createElement("script");

  // Set the source of the script
  script.src = "https://www.google.com/recaptcha/api.js";

  // Add the script to the document
  document.body.appendChild(script);
  //Gọi hàm submit
  await submittingTicketFormEvent(editor, idTicketForm);
}

renderMainTicketForm("150000112167");
