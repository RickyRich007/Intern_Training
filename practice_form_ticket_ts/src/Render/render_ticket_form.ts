import {
  LabelTicketForm,
  InputTicketForm,
  DropDownTicketForm,
  DecriptionTicketForm,
  CheckBoxTicketForm,
} from "../Component/cpnt_ticket_form";
import { getApiTicketField } from "../API/get_api";

//renderInputField
function renderInputField(element: any): [HTMLElement, HTMLElement] {
  const labelEleInput = new LabelTicketForm({
    id: element.id,
    content: element.label_for_customers,
  });
  const inputEle = new InputTicketForm({
    id: element.id,
    name: element.name,
    type: "text",
  });
  return [labelEleInput.getElement(), inputEle.getElement()];
}

//renderDropDownField
async function renderDropDownField(
  element: any,
  clickEvent: boolean,
  parentContainer: HTMLElement,
  skeLoading: HTMLElement
): Promise<void> {
  const labelEle = new LabelTicketForm({
    id: element.id,
    content: element.label_for_customers,
  });
  let dataEle = await getApiTicketField(element.id);

  const dropDownEle = new DropDownTicketForm({
    id: element.id,
    name: element.name,
    choices: dataEle.choices,
  });
  let elements = [];

  if (
    element.type == "custom_dropdown" &&
    element.has_section &&
    !element.section_mappings
  ) {
    let childContainer = <HTMLDivElement>document.createElement("div");
    childContainer.id = `divChildEle+${element.id}`;
    elements.push(
      labelEle.getElement(),
      dropDownEle.getElement(),
      childContainer
    );
    clickDDown(dropDownEle.getElement(), dataEle.sections, childContainer);
  } else if (clickEvent && element.section_mappings) {
    switch (element.type) {
      case "custom_dropdown":
        elements.push(labelEle.getElement(), dropDownEle.getElement());
        break;
      case "custom_text":
        const [labelEleCustomTxt, eleInputCustomTxt] =
          renderInputField(dataEle);
        elements.push(labelEleCustomTxt, eleInputCustomTxt);
        break;
      case "custom_checkbox":
        const eleCheckBox = renderCheckBoxField(dataEle);
        elements.push(eleCheckBox);
        break;
      default:
        break;
    }
  }
  skeLoading?.remove();
  parentContainer.append(...elements);
}
//renderDesField
function renderDesField(element: any) {
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
//renderCheckBoxField
function renderCheckBoxField(element: any) {
  const eleCheckBox = new CheckBoxTicketForm({
    id: element.id,
    content: element.label_for_customers,
    name: element.name,
  });
  eleCheckBox.renderCheckBox();
  return eleCheckBox.getElement();
}

function clickDDown(
  optionSelected: HTMLElement,
  section: any,
  childContainer: HTMLElement
): void {
  optionSelected?.addEventListener("change", function (e) {
    section.forEach(async (element: any) => {
      if (
        (e.target as HTMLSelectElement).options[
          (e.target as HTMLSelectElement).selectedIndex
        ].id == element.choice_ids[0]
      ) {
        let tempArr = [];
        for (let i = element.ticket_field_ids.length - 1; i >= 0; i--) {
          let tempAwait = await getApiTicketField(element.ticket_field_ids[i]);
          tempArr.push(tempAwait);
        }
        let newArr = tempArr.map((data) => {
          let temp = data.section_mappings.find(
            (value: any) => value.section_id == element.id
          );
          if (temp) {
            data.tempPosition = temp.position;
          }
          return data;
        });
        newArr = newArr.sort((a, b) => {
          return a.tempPosition - b.tempPosition;
        });
        childContainer.innerHTML = "";
        for (let i = 0; i < newArr.length; i++) {
          const skeLoading = document.createElement("div");
          skeLoading.innerHTML = `<h2 class="card-title skeleton"></h2>`;
          childContainer.appendChild(skeLoading);
          await renderDropDownField(
            newArr[i],
            true,
            childContainer,
            skeLoading
          );
        }
      }
    });
  });
}
export {
  renderInputField,
  renderDropDownField,
  renderDesField,
  renderCheckBoxField,
};
