interface ITicketField {
  id: string;
  label_for_customers: string;
  name: string;
  section_mappings: Array<object>;
  sections: ITicketField[];
  type: string;
  choices: Array<object>;
  choice_ids: Array<string>;
  ticket_field_ids: Array<string>;
}
export { ITicketField };
