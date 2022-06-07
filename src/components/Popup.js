export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // сохраняем, чтобы можно было удалить обработчик, т.к. this._handleEscClose.bind(this) каждый раз генерит новую ссылку
    this._handleEscCloseWithContext = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscCloseWithContext);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscCloseWithContext);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    // событие на кнопку закрытия
    this._popup
      .querySelector('.popup__close-button')
      .addEventListener('click', this.close.bind(this));

    // событие по клику на оверлей попапа
    this._popup
      .addEventListener('click', event => { if (event.target === event.currentTarget) { this.close() } });
  }
}
