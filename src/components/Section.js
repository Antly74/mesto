export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAll(items) {
    items
      .forEach(elementData => this._renderer(elementData));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
