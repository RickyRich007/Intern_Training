import {
  TicketForm,
  ReCaptChaTicketForm,
  UpLoadFileTForm,
  FeatureBtnTicketForm,
} from "./component/cpnt-ticket-form.js";
import {
  renderInputField,
  renderDropDownField,
  renderDesField,
} from "./render/render-ticket-form.js";
import { getDataTicketForm } from "./api/get-data-field.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ITicketForm } from "./interface/ITicketForm.js";
import { ITicketField } from "./interface/ITicketField.js";
import { operationMapping } from "./render/object-mapping-render-ticket-form.js";
async function renderMainTicketForm(): Promise<void> {
  let elementFieldArr: HTMLElement[] = [];

  const skeleton = <HTMLElement>document.createElement("div");
  skeleton.innerHTML = `<form class="ticketsForm skeleton">
  <label for="150000290869" class="labelTickForm"></label>
  <input id="150000671202" class="inputTicketForm skeleton" required="">
  <label for="150000290869" class="labelTickForm"></label>
  <input id="150000290860"  class="inputTicketForm skeleton" required="">
  <label for="150000290869" class="labelTickForm"></label>
</form>`;

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
  let tempVar: any;
  dataTicketForm.fields.forEach((element: ITicketField) => {
    if (!element.section_mappings && !element.sections) {
      switch (element.type) {
        case "custom_text":
          operationMapping["custom_text"](elementFieldArr, element);
          break;
        case "default_requester":
          operationMapping["default_requester"](elementFieldArr, element);
          break;
        case "default_company":
          operationMapping["default_company"](elementFieldArr, element);
          break;
        case "custom_dropdown":
          operationMapping["custom_dropdown"](
            elementFieldArr,
            element,
            dataTicketForm.fields
          );
          break;
        case "default_description":
          tempVar = element.id;
          operationMapping["default_description"](elementFieldArr, element);
          break;
        default:
          break;
      }
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
  ClassicEditor.create(document.getElementById(tempVar) as HTMLElement);
}

renderMainTicketForm();
