class BaseComponent {
  protected element!: HTMLElement;
  constructor() {}
  public setElement(element: HTMLElement) {
    this.element = element;
  }
  getElement() {
    return this.element;
  }
}
//Class TicketForm
class TicketForm extends BaseComponent {
  private id: string;
  private name: string;
  private title: string;
  constructor(props: { id: string; name: string; title: string }) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.title = props.title;
    this.renderForm();
  }
  protected renderForm(): void {
    this.element = <HTMLFormElement>document.createElement("form");
    this.element.setAttribute("id", this.id);
    this.element.setAttribute("name", this.name);
    this.element.setAttribute("title", this.title);
    this.element.setAttribute("method", "post");
    this.element.setAttribute("enctype", "multipart/form-data");
    this.element.className = "ticketsForm";
  }
}

//Class Label
class LabelTicketForm extends BaseComponent {
  private txtLabel: string;
  private idInput: string;
  constructor(props: { id: string; content: string }) {
    super();
    this.txtLabel = props.content;
    this.idInput = props.id;
    this.renderLabel();
  }
  protected renderLabel(): void {
    this.element = <HTMLLabelElement>document.createElement("label");
    this.element.textContent = this.txtLabel;
    this.element.setAttribute("for", this.idInput);
    this.element.className = "labelTickForm";
  }
}

//Class Input
class InputTicketForm extends BaseComponent {
  private id: string;
  private type: string;
  private name: string;
  constructor(props: { id: string; type: string; name: string }) {
    super();
    this.id = props.id;
    this.type = props.type;
    this.name = props.name;
    this.renderInput();
  }
  protected renderInput(): void {
    this.element = document.createElement("input");
    this.element.setAttribute("id", this.id);
    this.element.setAttribute("name", this.name);
    this.element.setAttribute("type", this.type);
    this.element.className = "inputTicketForm";
    (this.element as HTMLInputElement).required = true;
  }
}
//Class custom Dropdown
class DropDownTicketForm extends BaseComponent {
  private id: string;
  private name: string;

  constructor(props: { id: string; name: string; choices: Array<object> }) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.renderOption(props.choices);
  }
  protected renderOption(choices: Array<any>) {
    this.element = document.createElement("select");
    this.element.setAttribute("id", this.id);
    this.element.setAttribute("name", this.name);
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Choose...";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    (this.element as HTMLSelectElement).add(defaultOption);
    choices?.forEach((data) => {
      const option = document.createElement("option");
      option.textContent = data.value;
      option.value = data.value;
      option.id = data.id;
      (option as HTMLOptionElement).setAttribute("parent_choice_id", this.id);
      (this.element as HTMLSelectElement).add(option);
    });
    this.element.className = "dropDownTicketForm";
  }
}
////Description
class DecriptionTicketForm extends BaseComponent {
  private id: string;
  private name: string;
  private class: string;
  constructor(props: { id: string; name: string; class: string }) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.class = props.class;
  }
  public renderDesEditor() {
    this.element = <HTMLDivElement>document.createElement("div");
    this.element.setAttribute("id", this.id);
    this.element.setAttribute("class", this.class);
    this.element.setAttribute("name", this.name);
    this.element.className = "desTicketForm";
  }
}

//Recaptcha
class ReCaptChaTicketForm extends BaseComponent {
  constructor() {
    super();
  }
  public renderContent() {
    this.element = document.createElement("div");
    this.element.setAttribute("id", "rcaptcha");
    this.element.setAttribute("class", "g-recaptcha");
    this.element.setAttribute(
      "data-sitekey",
      "6Lfpvd0kAAAAAKGrJcZaIWEQgY5FRW8lMETtX7q6"
    );
    this.element.style.marginTop = "1em";
  }
  public renderSpan() {
    this.element = document.createElement("span");
    this.element.setAttribute("id", "captcha");
    (this.element as HTMLSpanElement).style.color = "red";
  }
}

//upload
class UpLoadFileTForm extends BaseComponent {
  constructor() {
    super();
  }
  public renderUFile() {
    this.element = document.createElement("input");
    (this.element as HTMLInputElement).type = "file";
    this.element.setAttribute("accept", ".pdf,.doc,.docx,.jpg,.jpeg,.png");
    this.element.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }
      const fileSizeKB = Math.round(file.size / 1024);
      if (fileSizeKB > 20000) {
        (event.target as HTMLInputElement).value = ""; // Reset the input field
        alert("File size exceeds the limit of 20MB."); // Show an error message
      }
    });
    this.element.className = "uploadTicketForm";
    this.element.setAttribute("name", "attachments[]");
  }
}

//featurBtn
class FeatureBtnTicketForm extends BaseComponent {
  constructor() {
    super();
  }
  public renderCnlBtn() {
    this.element = document.createElement("a");
    this.element.setAttribute("href", "https://www.facebook.com");
    this.element.textContent = "Cancel";
    this.element.className = "btnCancelTicketForm";
  }
  public renderSubmitBtn() {
    this.element = document.createElement("button");
    (this.element as HTMLButtonElement).type = "submit";
    this.element.textContent = "Submit";
    this.element.className = "btnSubmitTicketForm";
  }
}

//checkbox
class CheckBoxTicketForm extends BaseComponent {
  private id: string;
  private content: string;
  private name: string;
  constructor(props: { id: string; content: string; name: string }) {
    super();
    this.id = props.id;
    this.content = props.content;
    this.name = props.name;
  }
  public renderCheckBox() {
    const policyCheckbox = document.createElement("input");
    policyCheckbox.setAttribute("type", "checkbox");
    policyCheckbox.setAttribute("id", this.id);
    policyCheckbox.setAttribute("name", this.name);
    policyCheckbox.setAttribute("custom-fields", "custom");
    policyCheckbox.className = "policyCheckbox";
    const policyLabel = document.createElement("label");
    policyLabel.setAttribute("for", this.id);
    policyLabel.textContent = " " + this.content;
    const Exdiv = document.createElement("div");
    Exdiv.appendChild(policyCheckbox);
    Exdiv.appendChild(policyLabel);
    Exdiv.style.display = "block";
    this.element = Exdiv;
  }
}

export {
  TicketForm,
  LabelTicketForm,
  InputTicketForm,
  DropDownTicketForm,
  DecriptionTicketForm,
  ReCaptChaTicketForm,
  UpLoadFileTForm,
  FeatureBtnTicketForm,
  CheckBoxTicketForm,
};
