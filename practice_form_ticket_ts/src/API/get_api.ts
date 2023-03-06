import { token_api, token_field_api, tokenD2T } from "../Constant/token_api";

async function getApi(): Promise<any> {
  // Storing response
  const response = await fetch(token_api, {
    headers: {
      Authorization: "Basic " + btoa(tokenD2T),
    },
  });
  // Storing data in form of JSON
  const data = await response.json();
  return data;
}

async function getApiTicketField(id: string): Promise<any> {
  const response = await fetch(`${token_field_api}${id}?include=section`, {
    headers: {
      Authorization: "Basic " + btoa(tokenD2T),
    },
  });
  // Storing data in form of JSON
  const data = await response.json();
  return data;
}
export { getApi, getApiTicketField };
