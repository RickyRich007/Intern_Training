import { postApiTicketForm } from "../api/post-api.js";
async function submittingTicketFormEvent(
  editor: any,
  idTicketForm: string
): Promise<void> {
  const ticketForm = document.getElementById(idTicketForm) as HTMLElement;

  //Lấy nội dung từ Description CKEditor 5
  let desValue = "";
  editor.then((editor: any) => {
    editor.model.document.on("change:data", () => {
      desValue = editor.getData().replace(/<[^>]*>?/gm, "");
    });
  });

  //Sự kiện submit form
  ticketForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    //formdata này chứa tất cả dữ liệu mà mình submit
    const formDataSubmit = new FormData(event.target as HTMLFormElement);
    let id = parseInt(idTicketForm);
    //form này trả về dạng form file để gọi post api
    const formResult = generateDataSubmit(formDataSubmit, id, desValue);

    await postApiTicketForm(formResult);
  });
}

function generateDataSubmit(
  formDataSubmit: FormData,
  idForm: number,
  desValue: string
): FormData {
  const formResult = new FormData();
  formDataSubmit.forEach((value, key) => {
    //check xem trường đó phải làm custom field để gán vào object custom fields
    if (
      document.forms[idForm].elements[key as any].getAttribute("custom-fields")
    ) {
      if (value == "on") {
        //set trạng thái checkbox về true
        formResult.append(`[custom_fields][${key}]`, "true");
      } else {
        formResult.append(`[custom_fields][${key}]`, value);
      }
      //nếu không phải thì set defautl
    } else {
      if (key == "requester") {
        formResult.append(`email`, value);
      } else if (key !== "company" && key !== "g-recaptcha-response") {
        formResult.append(`${key}`, value);
      }
    }
  });

  formResult.append("description", desValue);
  //thêm trạng thái cứng ticket, có thể set
  formResult.append("priority", "1");
  formResult.append("status", "2");
  return formResult;
}
export { submittingTicketFormEvent };
