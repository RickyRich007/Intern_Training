export class BaseComponent {
  constructor() {
    this.element = null;
  }

  setElement(element) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }
}
