import { apiPostTicketForm, tokenD2T } from "../constant/api-ticket-form.js";

async function postApiTicketForm(body: any): Promise<any> {
  // Storing response
  const response = await fetch(`${apiPostTicketForm}`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(tokenD2T),
    },
    body: body,
  });
}
export { postApiTicketForm };
