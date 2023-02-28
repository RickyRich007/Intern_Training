import {
  TicketForm,
  LabelTicketFrm,
  InputTicketFrm,
  DropDownTicketFrm,
  DecriptionTicketFrm,
  ReCaptChaTicketFrm,
  UpLoadFileTFrm,
  FeatureBtnTicketForm,
  CheckBoxTicketForm,
} from "./component.js";
function renderAutoInputTextFrm(element) {
  const eleLabel = new LabelTicketFrm(element.id, element.label_for_customers);
  const eleInput = new InputTicketFrm(element.id, "text");
  eleLabel.renderLabelTicketFrm();
  eleInput.renderInputTicketFrm();
  return [eleLabel.element, eleInput.element];
}
function renderAutoDropDownFrm(element, options) {
  const eleLabel = new LabelTicketFrm(element.id, element.label_for_customers);
  const eleDDown = new DropDownTicketFrm(
    element.id,
    element.type,
    element.name
  );
  eleLabel.renderLabelTicketFrm();
  eleDDown.renderOptionTDDown(options);
  return [eleLabel.element, eleDDown.element];
}
function renderAutoDescriptonFrm(element) {
  const eleLabel = new LabelTicketFrm(element.id, element.label_for_customers);
  const eleDes = new DecriptionTicketFrm("editor", element.name);
  eleLabel.renderLabelTicketFrm();
  eleDes.renderDesEditor();
  return [eleLabel.element, eleDes.element];
}
function renderAutoCheckBoxFrm(element) {
  const eleCheckBox = new CheckBoxTicketForm(
    element.id,
    element.label_for_customers
  );
  eleCheckBox.renderCheckBoxTicketForm();
  return eleCheckBox.element;
}
export {
  renderAutoInputTextFrm,
  renderAutoDropDownFrm,
  renderAutoDescriptonFrm,
  renderAutoCheckBoxFrm,
};
