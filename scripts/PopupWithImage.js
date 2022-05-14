import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._nodeFigureImage = this._popup.querySelector('.popup__image');
    this._nodeFigureCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    this._nodeFigureImage.src = link;
    this._nodeFigureImage.alt = name;
    this._nodeFigureCaption.textContent = name;
    super.open();
  }
}
