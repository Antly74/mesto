import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector);
    this._form = this._popup.querySelector(config.formSelector);
    this._submitTextContent = this._form.submit.textContent;
  }

  _onSubmitForm(event) {
    event.preventDefault();
    this._handleSubmitForm(this);
  }

  setHandleSubmitForm(handleSubmitForm) {
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._onSubmitForm(event));
  }

  close() {
    super.close();
    this._handleSubmitForm = null; // очищаем свойство, больше этот handle нам не нужен
  }

  renderLoading(isLoading, textLoading = 'Удаление...') {
    if (isLoading) {
      this._form.submit.textContent = textLoading;
    } else {
      this._form.submit.textContent = this._submitTextContent;
    }
  }
}
