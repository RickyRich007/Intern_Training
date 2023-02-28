import { BaseComponent } from "./Base.js";

//Ticket Form
class TicketForm extends BaseComponent {
  constructor(id, name, title) {
    super();
    this.id = id;
    this.name = name;
    this.title = title;
  }
  renderTicketFrm() {
    this.element = document.createElement("form");
    this.element.setAttribute("id", this.id);
    this.element.setAttribute("name", this.name);
    this.element.setAttribute("method", "post");
    this.element.setAttribute("enctype", "multipart/form-data");
    this.element.style.borderRadius = "5px";
    this.element.style.backgroundColor = "#f2f2f2";
    this.element.style.padding = "20px";
    this.element.style.width = "70%";
    this.element.style.margin = "auto";
  }
}

// Label
class LabelTicketFrm extends BaseComponent {
  constructor(idInput, txtLabel) {
    super();
    this.txtLabel = txtLabel;
    this.idInput = idInput;
  }
  renderLabelTicketFrm() {
    this.element = document.createElement("label");
    this.element.textContent = this.txtLabel;
    this.element.setAttribute("for", this.idInput);
    this.element.style.display = "block";
    this.element.style.marginTop = "1em";
    this.element.style.marginBottom = "0.3em";
    this.element.style.fontSize = "1.2em";
  }
}

//Input
class InputTicketFrm extends BaseComponent {
  constructor(idInput, typeInput, nameInput) {
    super();
    this.idInput = idInput;
    this.typeInput = typeInput;
    this.nameInput = nameInput;
  }
  renderInputTicketFrm() {
    this.element = document.createElement("input");
    this.element.setAttribute("id", this.idInput);
    this.element.setAttribute("type", this.typeInput);
    this.element.setAttribute("name", this.nameInput);
    this.element.style.padding = "10px";
    this.element.style.border = "1px solid #ccc";
    this.element.style.borderRadius = "8px";
    this.element.style.marginBottom = "10px";
    this.element.style.width = "98%";
    this.element.style.margin = "auto";
    this.element.style.fontSize = "1em";
    this.element.required = true;
  }
}

//custom Dropdown
class DropDownTicketFrm extends BaseComponent {
  constructor(idDDown, typeInput, nameList) {
    super();
    this.idDDown = idDDown;
    this.typeInput = typeInput;
    this.nameList = nameList;
  }
  renderOptionTDDown(optionArr) {
    this.element = document.createElement("select");
    this.element.setAttribute("id", this.idDDown);
    this.element.setAttribute("class", "selectDropDown");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Choose...";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    this.element.add(defaultOption);
    for (let i = 0; i < optionArr.length; i++) {
      if (optionArr[i].element.section_mappings[0].position == 1) {
        var option = document.createElement("option");
        option.textContent = optionArr[i].element.label_for_customers;
        option.setAttribute(
          "id",
          optionArr[i].element.section_mappings[0].section_id
        );
        this.element.add(option);
      }
    }
    this.element.style.padding = "10px";
    this.element.style.border = "1px solid #ccc";
    this.element.style.borderRadius = "8px";
    this.element.style.width = "98%";
    this.element.style.margin = "auto";
    this.element.style.fontSize = "1em";
    //document.body.appendChild(this.element);
  }
}

////Description
class DecriptionTicketFrm extends BaseComponent {
  constructor(idDes, name) {
    super();
    this.idDes = idDes;
    this.name = name;
  }
  renderDesEditor() {
    this.element = document.createElement("div");
    this.element.setAttribute("id", this.idDes);
    this.element.setAttribute("class", this.name);
    this.element.style.borderRadius = "8px";
    this.element.style.width = "80%";
  }
}

//Recaptcha
class ReCaptChaTicketFrm extends BaseComponent {
  constructor() {
    super();
  }
  renderContent() {
    this.element = document.createElement("div");
    this.element.setAttribute("id", "rcaptcha");
    this.element.setAttribute("class", "g-ReCaptCha");
    this.element.setAttribute("data-sitekey", "site key");
    this.element.style.marginTop = "1em";
  }
  renderSpan() {
    this.element = document.createElement("span");
    this.element.setAttribute("id", "captcha");
    this.element.style = "color:red";
  }
}

//upload
class UpLoadFileTFrm extends BaseComponent {
  constructor() {
    super();
  }
  renderUFile() {
    this.element = document.createElement("input");
    this.element.type = "file";
    this.element.setAttribute("accept", ".pdf,.doc,.docx,.jpg,.jpeg,.png");
    this.element.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const fileSizeKB = Math.round(file.size / 1024);
      if (fileSizeKB > 1000) {
        event.target.value = ""; // Reset the input field
        alert("File size exceeds the limit of 1MB."); // Show an error message
      }
    });
    this.element.style.display = "block";
    this.element.style.marginTop = "1em";
    this.element.style.marginBottom = "1em";
  }
}

//featurBtn
class FeatureBtnTicketForm extends BaseComponent {
  constructor() {
    super();
  }
  renderCnlBtn() {
    this.element = document.createElement("a");
    this.element.setAttribute("href", "https://www.facebook.com");
    this.element.textContent = "Cancel";
    this.element.style.backgroundColor = "red";
    this.element.style.color = "white";
    this.element.style.padding = "12px 20px";
    this.element.style.border = "none";
    this.element.style.borderRadius = "4px";
    this.element.style.cursor = "pointer";
    this.element.style.width = "4%";
    this.element.style.textDecoration = "none";
  }
  renderSubmitBtn() {
    this.element = document.createElement("button");
    this.element.type = "submit";
    this.element.textContent = "Submit";
    this.element.style.backgroundColor = "#4CAF50";
    this.element.style.color = "white";
    this.element.style.padding = "12px 20px";
    this.element.style.border = "none";
    this.element.style.borderRadius = "4px";
    this.element.style.cursor = "pointer";
    this.element.style.marginLeft = "0.5em";
  }
}

//checkbox
class CheckBoxTicketForm extends BaseComponent {
  constructor(id, content) {
    super();
    this.id = id;
    this.content = content;
  }
  renderCheckBoxTicketForm() {
    const policyCheckbox = document.createElement("input");
    policyCheckbox.setAttribute("type", "checkbox");
    policyCheckbox.setAttribute("id", this.id);
    policyCheckbox.style.marginRight = "auto";
    policyCheckbox.style.marginTop = "1em";
    policyCheckbox.style.marginBottom = "1em";
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
  LabelTicketFrm,
  InputTicketFrm,
  DropDownTicketFrm,
  DecriptionTicketFrm,
  ReCaptChaTicketFrm,
  UpLoadFileTFrm,
  FeatureBtnTicketForm,
  CheckBoxTicketForm,
};
