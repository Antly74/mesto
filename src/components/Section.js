export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAll() {
    this._items.forEach((elementData) => this.addItem(elementData));
  }

  addItem(elementData) {
    const element = this._renderer(elementData);
    this._container.prepend(element);
  }
}
