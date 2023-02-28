import {
  TicketForm,
  LabelTicketFrm,
  InputTicketFrm,
  DropDownTicketFrm,
  DecriptionTicketFrm,
  ReCaptChaTicketFrm,
  UpLoadFileTFrm,
  FeatureBtnTicketForm,
  CheckBoxTicketForm,
} from "./component.js";
import { getapi } from "./getapi.js";
import {
  renderAutoInputTextFrm,
  renderAutoDropDownFrm,
  renderAutoDescriptonFrm,
  renderAutoCheckBoxFrm,
} from "./render.js";

// Calling that async function
getapi().then((data) => {
  //renderForm
  const ticketForm = new TicketForm(data.id, data.name, data.title);
  ticketForm.renderTicketFrm();

  //filter Child DropDown
  var options = [];
  data.fields.forEach((element) => {
    if (element.section_mappings) {
      var name = element.label_for_customers;
      var id = element.id;
      options.push({ element });
    }
  });

  //render first field
  data.fields.forEach((element) => {
    if (element.type == "custom_text" && !element.section_mappings) {
      const [eleLabel, eleInput] = renderAutoInputTextFrm(element);
      ticketForm.element.appendChild(eleLabel);
      ticketForm.element.appendChild(eleInput);
      //field default_requester
    } else if (element.type == "default_requester") {
      const [eleLabel, eleInput] = renderAutoInputTextFrm(element);
      ticketForm.element.appendChild(eleLabel);
      ticketForm.element.appendChild(eleInput);
      //field default_company
    } else if (element.type == "default_company") {
      const [eleLabel, eleInput] = renderAutoInputTextFrm(element);
      ticketForm.element.appendChild(eleLabel);
      ticketForm.element.appendChild(eleInput);
      //field custom_dropdown
    } else if (element.type == "custom_dropdown" && element.has_section) {
      const [eleLabel, eleDDown] = renderAutoDropDownFrm(element, options);
      const divChild = document.createElement("div");
      divChild.setAttribute("id", `divChild+${element.id}`);
      ticketForm.element.appendChild(eleLabel);
      ticketForm.element.appendChild(eleDDown);
      ticketForm.element.appendChild(divChild);

      //field custom_dropdown
    } else if (element.type == "default_description") {
      const [eleLabel, eleDes] = renderAutoDescriptonFrm(element);
      ticketForm.element.appendChild(eleLabel);
      ticketForm.element.appendChild(eleDes);
    }
  });
  let options1 = [];
  const recaptcha = new ReCaptChaTicketFrm();
  recaptcha.renderContent();
  ticketForm.element.appendChild(recaptcha.element);
  recaptcha.renderSpan();
  ticketForm.element.appendChild(recaptcha.element);

  const uploadfile = new UpLoadFileTFrm();
  uploadfile.renderUFile();
  ticketForm.element.appendChild(uploadfile.element);

  const featurebtn = new FeatureBtnTicketForm();

  featurebtn.renderCnlBtn();
  ticketForm.element.appendChild(featurebtn.element);
  featurebtn.renderSubmitBtn();
  ticketForm.element.appendChild(featurebtn.element);

  document.body.appendChild(ticketForm.element);
  ClassicEditor.create(document.querySelector("#editor")).catch((error) => {
    console.error(error);
  });

  let dropDownBtn = document.getElementById("150000671197");
  dropDownBtn.addEventListener("change", function (e) {
    let divChidDDown = document.getElementById("divChild+150000671197");
    divChidDDown.innerHTML = "";
    options.forEach((data) => {
      if (
        data.element.section_mappings[0].section_id ==
        event.target.options[event.target.selectedIndex].id
      ) {
        if (data.element.type == "custom_text") {
          const [eleLabel, eleInput] = renderAutoInputTextFrm(data.element);
          divChidDDown.appendChild(eleLabel);
          divChidDDown.appendChild(eleInput);
        } else if (data.element.type == "custom_dropdown") {
          const [eleLabel, eleDDown] = renderAutoDropDownFrm(
            data.element,
            options1
          );
          divChidDDown.appendChild(eleLabel);
          divChidDDown.appendChild(eleDDown);
        } else if (data.element.type == "custom_checkbox") {
          const eleCheckBox = renderAutoCheckBoxFrm(data.element);
          divChidDDown.appendChild(eleCheckBox);
        }
      }
    });
  });
});
