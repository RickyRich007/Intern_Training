async function getapi() {
  // Storing response
  const response = await fetch(
    "https://d2t.freshdesk.com/api/v2/ticket-forms/150000099965",
    {
      headers: {
        Authorization: "Basic " + btoa("hKlmdtyW9klT4uX4dUf1:X"),
      },
    }
  );
  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  return data;
}
export { getapi };
