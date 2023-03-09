import {
  apiTicketForm,
  apiFieldTicketFom,
  tokenD2T,
} from "../constant/api-ticket-form.js";

async function getApiTicketForm(id: string): Promise<any> {
  // Storing response
  const response = await fetch(`${apiTicketForm}${id}`, {
    headers: {
      Authorization: "Basic " + btoa(tokenD2T),
    },
  });
  // Storing data in form of JSON
  const data = await response.json();
  return data;
}

async function getApiTicketFormField(id: string): Promise<any> {
  const response = await fetch(`${apiFieldTicketFom}${id}?include=section`, {
    headers: {
      Authorization: "Basic " + btoa(tokenD2T),
    },
  });
  // Storing data in form of JSON
  const data = await response.json();
  return data;
}
export { getApiTicketForm, getApiTicketFormField };
