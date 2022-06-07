export default class Card {
  constructor(elementData, me, templateClass, { handleCardClick, handleCardDelete, handleCardLike }) {
    this._templateClass = templateClass;
    this._elementLink = elementData.link;
    this._elementName = elementData.name;
    this._id = elementData._id;
    this._me = me;
    this._owner = elementData.owner._id;
    this.setLikes(elementData);

    this._openPopupImage = handleCardClick;
    this._deleteCard = handleCardDelete;
    this._likeCard = handleCardLike;
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
    this._likeCard(this._id, this._isLiked);
  }

  _onButtonDeleteClick() {
    this._deleteCard(this._id);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => this._openPopupImage(this._elementLink, this._elementName) );
    this._buttonLike.addEventListener('click', () => this._onButtonLikeClick() );
    this._buttonDelete.addEventListener('click', () => this._onButtonDeleteClick() );
  }

  generate() {
    this._element = this._getElement();
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._buttonDelete = this._element.querySelector('.element__button-delete');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementCaptionText = this._element.querySelector('.element__caption-text');
    this._elementLikesCount = this._element.querySelector('.element__like-count');

    this._setEventListeners();

    // заполняем данные
    this._elementImage.src = this._elementLink;
    this._elementImage.alt = this._elementName;
    this._elementCaptionText.textContent = this._elementName;

    this.renderLikes();

    // если владелец карточки не я, то кнопку Delete удаляем
    if (this._me != this._owner) {
      this._buttonDelete.remove();
    }

    return this._element;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  renderLikes() {
    this._buttonLike.classList.toggle('element__button-like_active', this._isLiked);
    this._elementLikesCount.textContent = this._likesCount;
  }

  setLikes(elementData) {
    this._likesCount = elementData.likes.length;
    this._isLiked = Boolean(elementData.likes.find(el => el._id === this._me, this));
  }

}
