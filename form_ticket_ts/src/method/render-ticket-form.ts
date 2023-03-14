import {
  LabelTicketForm,
  InputTicketForm,
  DropDownTicketForm,
  DecriptionTicketForm,
  CheckBoxTicketForm,
} from "../component/cpnt-ticket-form.js";
import { ITicketField } from "../interface/ITicketField.js";
import { operationMapping } from "./object-mapping-render-ticket-form.js";

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
  //fitler ra hết các field dropdown có trong data form chính
  let dataElement = dataTicketFormField.filter(
    (value: ITicketField) => value.id == element.id
  );

  let fieldsElementArr: HTMLElement[] = [];
  dataElement.forEach((data: ITicketField) => {
    //nếu phải là dropdown và có lựa chọn
    if (data.type == "custom_dropdown" && data.choices) {
      const labelEle = new LabelTicketForm({
        id: element.id,
        content: element.label_for_customers,
      });
      const dropDownEle = new DropDownTicketForm({
        id: data.id,
        name: data.name,
        choices: data.choices,
      });
      dropDownEle.getElement().setAttribute("custom-fields", "custom");
      //nếu có con bên trong
      if (data.sections) {
        let childContainer = document.createElement("div");
        childContainer.id = `divChildEle+${data.id}`;
        fieldsElementArr.push(
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
        //nếu không có con
      } else {
        fieldsElementArr.push(labelEle.getElement(), dropDownEle.getElement());
      }
      //nếu không phải là dropdown
    } else {
      if (element.section_mappings) {
        operationMapping[element.type as keyof typeof operationMapping](
          fieldsElementArr,
          element
        );
      }
    }
  });
  parentContainer.append(...fieldsElementArr);
}

//EventClickAdlistener
function clickEventDropDown(
  optionSelected: HTMLElement,
  dataSection: ITicketField[],
  dataTicketFormField: ITicketField[],
  childContainer: HTMLElement
) {
  optionSelected?.addEventListener("change", function (e) {
    childContainer.innerHTML = "";
    dataSection.forEach((element: ITicketField) => {
      const selectedOptionId = (e.target as HTMLSelectElement).options[
        (e.target as HTMLSelectElement).selectedIndex
      ].id;
      if (selectedOptionId == element.choice_ids[0]) {
        let tempArr: ITicketField[] = [];
        for (let i = 0; i < element.ticket_field_ids.length; i++) {
          let tempAwait = dataTicketFormField.find(
            (value: ITicketField) => value.id == element.ticket_field_ids[i]
          );
          tempArr.push(tempAwait!);
        }
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
