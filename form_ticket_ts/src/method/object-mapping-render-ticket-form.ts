import {
  renderInputField,
  renderDropDownField,
  renderDesField,
  renderCheckBoxField,
} from "./render-ticket-form.js";
import { ITicketField } from "../interface/ITicketField.js";
export const operationMapping = {
  custom_text: (fieldsElementArr: HTMLElement[], element: ITicketField) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    inputCustomTxt.setAttribute("custom-fields", "custom");
    fieldsElementArr.push(labelCustomTxt, inputCustomTxt);
  },
  custom_dropdown: (
    fieldsElementArr: HTMLElement[],
    element: ITicketField,
    datafields?: ITicketField[]
  ) => {
    const divChild = <HTMLElement>document.createElement("div");
    divChild.setAttribute("id", `divChild+${element.id}`);
    fieldsElementArr.push(divChild);
    renderDropDownField(element, datafields!, divChild);
  },
  custom_checkbox: (fieldsElementArr: HTMLElement[], element: ITicketField) => {
    const eleCheckBox = renderCheckBoxField(element);
    fieldsElementArr.push(eleCheckBox);
  },
  default_subject: (fieldsElementArr: HTMLElement[], element: ITicketField) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    fieldsElementArr.push(labelCustomTxt, inputCustomTxt);
  },
  default_requester: (
    fieldsElementArr: HTMLElement[],
    element: ITicketField
  ) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    fieldsElementArr.push(labelCustomTxt, inputCustomTxt);
    inputCustomTxt.setAttribute("type", "email");
  },
  default_company: (fieldsElementArr: HTMLElement[], element: ITicketField) => {
    const [labelCustomTxt, inputCustomTxt] = renderInputField(element);
    fieldsElementArr.push(labelCustomTxt, inputCustomTxt);
  },
  default_description: (
    fieldsElementArr: HTMLElement[],
    element: ITicketField
  ) => {
    const [labelDefaultDes, desDefaultDes] = renderDesField(element);
    fieldsElementArr.push(labelDefaultDes, desDefaultDes);
  },
};
