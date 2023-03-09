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
import { operationMapping } from "./render/object-mapping-render-ticket-form.js";
async function renderMainTicketForm(): Promise<void> {
  let elementFieldArr: HTMLElement[] = [];

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
  let dataTicketForm: ITicketForm = await getDataTicketForm("150000099965");
  document.body.removeChild(skeleton);

  //renderFrm
  const ticketFrm = new TicketForm({
    id: dataTicketForm.id,
    name: dataTicketForm.name,
    title: dataTicketForm.title,
  });

  //renderFields
  dataTicketForm.fields.forEach((element: ITicketField) => {
    if (!element.section_mappings && !element.sections) {
      operationMapping[element.type as keyof typeof operationMapping](
        elementFieldArr,
        element,
        dataTicketForm.fields!
      );
    }
  });

  const recaptcha = new ReCaptChaTicketForm();
  recaptcha.renderContent();
  elementFieldArr.push(recaptcha.getElement());
  recaptcha.renderSpan();
  elementFieldArr.push(recaptcha.getElement());

  const uploadfile = new UpLoadFileTForm();
  uploadfile.renderUFile();
  elementFieldArr.push(uploadfile.getElement());

  const featurebtn = new FeatureBtnTicketForm();
  featurebtn.renderCnlBtn();
  elementFieldArr.push(featurebtn.getElement());

  featurebtn.renderSubmitBtn();
  elementFieldArr.push(featurebtn.getElement());

  elementFieldArr.forEach((element) => {
    ticketFrm.getElement().appendChild(element);
  });
  document.body.appendChild(ticketFrm.getElement());
  ClassicEditor.create(document.querySelector(".desTicketForm") as HTMLElement);
}

renderMainTicketForm();
