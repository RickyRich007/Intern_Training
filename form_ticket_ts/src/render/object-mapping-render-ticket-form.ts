import {
  renderInputField,
  renderDropDownField,
  renderDesField,
  renderCheckBoxField,
} from "../render/render-ticket-form.js";
import { ITicketField } from "../interface/ITicketField.js";
export const operationMapping = {
  custom_text: (elementFieldArr: HTMLElement[], element: ITicketField) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    elementFieldArr.push(labelCustomTxt, inputCustomTxt);
  },
  default_requester: (
    elementFieldArr: HTMLElement[],
    element: ITicketField
  ) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    elementFieldArr.push(labelCustomTxt, inputCustomTxt);
    inputCustomTxt.setAttribute("type", "email");
  },
  default_company: (elementFieldArr: HTMLElement[], element: ITicketField) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    elementFieldArr.push(labelCustomTxt, inputCustomTxt);
  },
  custom_dropdown: (
    elementFieldArr: HTMLElement[],
    element: ITicketField,
    datafields?: ITicketField[]
  ) => {
    const divChild = <HTMLElement>document.createElement("div");
    divChild.setAttribute("id", `divChild+${element.id}`);
    elementFieldArr.push(divChild);
    renderDropDownField(element, datafields!, divChild);
  },
  default_description: (
    elementFieldArr: HTMLElement[],
    element: ITicketField
  ) => {
    const [labelDefaultDes, desDefaultDes] = renderDesField(element);
    elementFieldArr.push(labelDefaultDes, desDefaultDes);
  },
  custom_checkbox: (elementFieldArr: HTMLElement[], element: ITicketField) => {
    const eleCheckBox = renderCheckBoxField(element);
    elementFieldArr.push(eleCheckBox);
  },
};
