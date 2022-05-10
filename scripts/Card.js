import { openPopup } from './index.js';

export default class Card {
  constructor(elementData, templateClass) {
    this._templateClass = templateClass;
    this._link = elementData.link;
    this._name = elementData.name;

    this._popupFigure = document.querySelector('.popup_type_image');
    this._nodeFigureImage = this._popupFigure.querySelector('.popup__image');
    this._nodeFigureCaption = this._popupFigure.querySelector('.popup__image-caption');
  }

  _getElement() {
  	const cardElement = document
      .querySelector(`.${this._templateClass}`)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _onButtonLikeClick() {
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  _onButtonDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _openPopupImage () {
    this._nodeFigureImage.src = this._link;
    this._nodeFigureImage.alt = this._name;
    this._nodeFigureCaption.textContent = this._name;
    openPopup(this._popupFigure);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => this._openPopupImage() );
    this._buttonLike.addEventListener('click', () => this._onButtonLikeClick() );
    this._buttonDelete.addEventListener('click', () => this._onButtonDeleteClick() );
  }

  generate() {
    this._element = this._getElement();
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._buttonDelete = this._element.querySelector('.element__button-delete');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementCaptionText = this._element.querySelector('.element__caption-text');

    this._setEventListeners();

    // заполняем данные
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementCaptionText.textContent = this._name;

    return this._element;
  }

}
