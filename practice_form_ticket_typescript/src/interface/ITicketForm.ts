import { ITicketField } from "./ITicketField.js";

export interface ITicketForm {
  id: string;
  name: string;
  title: string;
  fields: ITicketField[];
}
