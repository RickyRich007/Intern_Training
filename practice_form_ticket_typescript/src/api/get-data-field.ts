import { getApiTicketForm, getApiTicketFormField } from "./get-api.js";
import { ITicketForm } from "../interface/ITicketForm.js";
import { ITicketField } from "../interface/ITicketField.js";
async function getDataTicketForm(id: string): Promise<ITicketForm> {
  let dataTicketForm = await getApiTicketForm(id);
  for (let i = 0; i < dataTicketForm.fields.length; i++) {
    if (dataTicketForm.fields[i].section_mappings) {
      dataTicketForm.fields.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < dataTicketForm.fields.length; i++) {
    if (
      dataTicketForm.fields[i].type == "custom_dropdown" &&
      dataTicketForm.fields[i].has_section &&
      !dataTicketForm.fields[i].choices
    ) {
      let element = await getApiTicketFormField(dataTicketForm.fields[i].id);
      let dataTicketFormChild = await getDataDropDownField(element);
      if (dataTicketFormChild) {
        dataTicketForm.fields.push(...dataTicketFormChild);
      }
    }
  }
  return dataTicketForm;
}
async function getDataDropDownField(
  element: ITicketField
): Promise<ITicketField[]> {
  let tempArr: ITicketField[] = [];
  for (let i = 0; i < element.sections.length; i++) {
    for (let j = 0; j < element.sections[i].ticket_field_ids.length; j++) {
      let tempAwait = await getApiTicketFormField(
        element.sections[i].ticket_field_ids[j]
      );
      if (tempAwait.has_section) {
        let element = await getApiTicketFormField(tempAwait.id);
        let dataTicketFormChild = await getDataDropDownField(element);
        if (dataTicketFormChild) {
          tempArr.push(...dataTicketFormChild);
        }
      }
      tempArr.push(tempAwait);
    }
  }
  tempArr.push(await getApiTicketFormField(element.id));
  return tempArr;
}
export { getDataTicketForm };
