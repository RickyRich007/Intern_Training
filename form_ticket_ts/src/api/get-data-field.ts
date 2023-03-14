import { getApiTicketForm, getApiTicketFormField } from "./get-api.js";
import { ITicketForm } from "../interface/ITicketForm.js";
import { ITicketField } from "../interface/ITicketField.js";
async function getDataTicketForm(id: string): Promise<ITicketForm> {
  let dataTicketForm = await getApiTicketForm(id);
  //Xoá các field cấp 2
  for (let i = 0; i < dataTicketForm.fields.length; i++) {
    if (
      dataTicketForm.fields[i].section_mappings ||
      dataTicketForm.fields[i].type == "default_company"
    ) {
      dataTicketForm.fields.splice(i, 1);
      i--;
    }
  }
  //render các Field dropdown có chứa con, chờ lấy hết mới render
  const DropDownFieldPromises = dataTicketForm.fields.map(
    async (data: ITicketField) => {
      if (data.type == "custom_dropdown" && data.has_section && !data.choices) {
        let element = await getApiTicketFormField(data.id);
        return await getDataDropDownField(element);
      }
      return null;
    }
  );
  //khi lấy tất cả đã xong thì render DD nó ra
  const DropDownFieldResult = await Promise.all(DropDownFieldPromises);
  DropDownFieldResult.forEach((data) => {
    if (data !== null) {
      dataTicketForm.fields.push(...data);
    }
  });
  return dataTicketForm;
}

//render các Field dropdown cha, chờ lấy hết mới render
async function getDataDropDownField(
  element: ITicketField
): Promise<ITicketField[]> {
  let tempArr: ITicketField[] = [];
  const promises = element.sections.map((data: ITicketField) => {
    return getDataSectionDropDownField(data.ticket_field_ids);
  });
  //khi lấy tất cả đã xong thì mới render
  const result = await Promise.all(promises);
  result.forEach((data) => {
    tempArr.push(...data);
  });
  tempArr.push(element);
  return tempArr;
}

//render các Field dropdown con, chờ lấy hết mới render
async function getDataSectionDropDownField(
  ticket_field_ids: string[]
): Promise<ITicketField[]> {
  const promises = ticket_field_ids.map((id) => {
    return getApiTicketFormField(id);
  });
  const result = await Promise.all(promises);
  return result;
}
export { getDataTicketForm };
