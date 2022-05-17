import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleOpenForm, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handleOpenForm = handleOpenForm;
    this._handleSubmitForm = handleSubmitForm;
  }

  _onSubmitForm(event) {
    event.preventDefault();
    this._handleSubmitForm();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._onSubmitForm(event));
  }

  open() {
    this._handleOpenForm();
    super.open();
  }

  close() {
    super.close();
    setTimeout(() => this._form.reset(), 500); // при плавном закрытии необходимо, чтобы reset выполнился после полного исчезновения формы
  }
}
