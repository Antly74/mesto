export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAll() {
    this._items
      .map(elementData => this._renderer(elementData))
      .forEach(card => this.addItem(card.generate()));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
