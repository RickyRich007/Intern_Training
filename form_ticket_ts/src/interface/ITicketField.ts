interface ITicketField {
  id: string;
  label_for_customers: string;
  name: string;
  has_section: string;
  section_mappings: ISection_mappings[];
  sections: ITicketField[];
  type: string;
  choices: IChoices[];
  choice_ids: string[];
  ticket_field_ids: string[];
}
interface ISection_mappings {
  id: string;
  label: string;
  choice_ids: string[];
  ticket_field_ids: string[];
}
interface IChoices {
  id: string;
  label: string;
  position: string;
  value: string;
  parent_choice_id: string;
}
export { ITicketField };
