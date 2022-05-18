import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSelector, inputSelector }, handleOpenForm, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputSelector = inputSelector;
    this._handleOpenForm = handleOpenForm;
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputsValue() {
    const inputsValue = {};
    Array.from(this._form.elements).forEach(element => {
      if (element.classList.contains(this._inputSelector)) {
        inputsValue[element.id] = element.value;
      }
    });
    return inputsValue;
  }

  setInputsValue(inputsValue) {
    for (let name in inputsValue) {
      this._form.elements[name].value = inputsValue[name];
    }
  }

  _onSubmitForm(event) {
    event.preventDefault();
    this._handleSubmitForm(this._getInputsValue(), this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._onSubmitForm(event));
  }

  open() {
    this._handleOpenForm(this);
    super.open();
  }

  close() {
    super.close();
    setTimeout(() => this._form.reset(), 500); // при плавном закрытии необходимо, чтобы reset выполнился после полного исчезновения формы
  }
}
