import {
  LabelTicketForm,
  InputTicketForm,
  DropDownTicketForm,
  DecriptionTicketForm,
  CheckBoxTicketForm,
} from "../component/cpnt-ticket-form.js";
import { ITicketField } from "../interface/ITicketField.js";
import { operationMapping } from "../render/object-mapping-render-ticket-form.js";

//render Input
function renderInputField(selectFieldElement: ITicketField) {
  const labelEleInput = new LabelTicketForm({
    id: selectFieldElement.id,
    content: selectFieldElement.label_for_customers,
  });
  const inputEle = new InputTicketForm({
    id: selectFieldElement.id,
    name: selectFieldElement.name,
    type: "text",
  });
  return [labelEleInput.getElement(), inputEle.getElement()];
}

//renerDropDown
function renderDropDownField(
  element: ITicketField,
  dataTicketFormField: ITicketField[],
  parentContainer: HTMLElement
) {
  let dataElement = dataTicketFormField.filter(
    (value: ITicketField) => value.id == element.id
  );
  let elementFieldArr: HTMLElement[] = [];
  dataElement.forEach((data: ITicketField) => {
    if (data.type == "custom_dropdown") {
      if (data.choices) {
        const labelEle = new LabelTicketForm({
          id: element.id,
          content: element.label_for_customers,
        });
        const dropDownEle = new DropDownTicketForm({
          id: data.id,
          name: data.name,
          choices: data.choices,
        });
        if (data.sections) {
          let childContainer = document.createElement("div");
          childContainer.id = `divChildEle+${data.id}`;
          elementFieldArr.push(
            labelEle.getElement(),
            dropDownEle.getElement(),
            childContainer
          );
          clickEventDropDown(
            dropDownEle.getElement(),
            data.sections,
            dataTicketFormField,
            childContainer
          );
        } else {
          elementFieldArr.push(labelEle.getElement(), dropDownEle.getElement());
        }
      }
    } else {
      if (element.section_mappings) {
        switch (element.type) {
          case "custom_text":
            operationMapping["custom_text"](elementFieldArr, element);
            break;
          case "custom_checkbox":
            operationMapping["custom_checkbox"](elementFieldArr, element);
            break;
          default:
            break;
        }
      }
    }
  });
  parentContainer.append(...elementFieldArr);
}

//EventClickAdlistener
function clickEventDropDown(
  optionSelected: HTMLElement,
  dataSection: ITicketField[],
  dataTicketFormField: ITicketField[],
  childContainer: HTMLElement
) {
  optionSelected?.addEventListener("change", function (e) {
    dataSection.forEach((element: ITicketField) => {
      if (
        (e.target as HTMLSelectElement).options[
          (e.target as HTMLSelectElement).selectedIndex
        ].id == element.choice_ids[0]
      ) {
        let tempArr: ITicketField[] = [];
        for (let i = 0; i < element.ticket_field_ids.length; i++) {
          let tempAwait = dataTicketFormField.find(
            (value: ITicketField) => value.id == element.ticket_field_ids[i]
          );
          tempArr.push(tempAwait!);
        }
        childContainer.innerHTML = "";
        for (let i = 0; i < tempArr.length; i++) {
          renderDropDownField(tempArr[i], dataTicketFormField, childContainer);
        }
      }
    });
  });
}

//renderDesEditor
function renderDesField(element: ITicketField) {
  const labelEle = new LabelTicketForm({
    id: element.id,
    content: element.label_for_customers,
  });
  const eleDes = new DecriptionTicketForm({
    id: element.id,
    name: element.name,
    class: "editor",
  });
  eleDes.renderDesEditor();
  return [labelEle.getElement(), eleDes.getElement()];
}

//renderCheckBox
function renderCheckBoxField(element: ITicketField) {
  const eleCheckBox = new CheckBoxTicketForm({
    id: element.id,
    content: element.label_for_customers,
    name: element.name,
  });
  eleCheckBox.renderCheckBox();
  return eleCheckBox.getElement();
}

export {
  renderInputField,
  renderDropDownField,
  renderDesField,
  renderCheckBoxField,
};
