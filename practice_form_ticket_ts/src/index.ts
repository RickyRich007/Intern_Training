import {
  TicketForm,
  ReCaptChaTicketForm,
  UpLoadFileTForm,
  FeatureBtnTicketForm,
} from "./Component/cpnt_ticket_form";
import { getApi } from "./API/get_api";
import {
  renderInputField,
  renderDropDownField,
  renderDesField,
} from "./Render/render_ticket_form";

async function renderMainTicketForm(): Promise<void> {
  let dataTicketForm = await getApi();
  //renderFrm
  const ticketFrm = new TicketForm({
    id: dataTicketForm.id,
    name: dataTicketForm.name,
    title: dataTicketForm.title,
  });
  //render first field
  let elementFieldArr = [];
  dataTicketForm.fields.forEach((element: any) => {
    if (!element.section_mappings) {
      switch (element.type) {
        case "custom_text":
          const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
          elementFieldArr.push(labelCustomTxt, inputCustomTxt);
          break;
        case "default_requester":
          const [labelDefaultRequester, inputDefaultRequester] =
            renderInputField(element);
          elementFieldArr.push(labelDefaultRequester, inputDefaultRequester);
          break;
        case "default_company":
          const [labelDefaultCompany, inputDefaultCompany] =
            renderInputField(element);
          elementFieldArr.push(labelDefaultCompany, inputDefaultCompany);
          break;
        case "custom_dropdown":
          const divChild = <HTMLElement>document.createElement("div");
          divChild.setAttribute("id", `divChild+${element.id}`);
          elementFieldArr.push(divChild);
          const skeleton = <HTMLElement>document.createElement("div");
          skeleton.innerHTML = `<h2 class="card-title skeleton"></h2>`;
          elementFieldArr.push(skeleton);
          renderDropDownField(element, false, divChild, skeleton);
          break;
        case "default_description":
          const [labelDefaultDes, desDefaultDes] = renderDesField(element);
          elementFieldArr.push(labelDefaultDes, desDefaultDes);
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
  // ClassicEditor.create(document.querySelector("#editor")).catch(
  //   (error: any) => {
  //     console.error(error);
  //   }
  // );
}

renderMainTicketForm();
