export default class FormValidator {
  constructor(config, form) {
    this._formSelector   = config.formSelector;
    this._inputSelector  = config.inputSelector;
    this._inactiveButtonClass  = config.inactiveButtonClass;
    this._inputErrorClass  = config.inputErrorClass;
    this._errorClass   = config.errorClass;

    this._form = form;
    this._saveButton = this._form.querySelector(config.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('input', (event) => { this._onFormInput(event.target) } );
  }

  initForm() {
    // инициализируем статус формы
    this._setFormValidStatus();
    // сбрасываем элементы формы, чтобы пока пользователь не начал ввод, ошибка не отображалась
    Array.from(this._form.elements).forEach(element => {
      if (element.classList.contains(this._inputSelector)) {
        this._setInputValidStatus(element, true)
      }
    });
  }

  // отображаем или скрываем ошибку у поля ввода в зависимости от valid-состояния
  _setInputValidStatus(input, valid) {
    const inputError = input.form.querySelector(`#${input.id}-error`);
    if (valid) {
      inputError.textContent = '';
      inputError.classList.remove(this._errorClass);
      input.classList.remove(this._inputErrorClass);
    } else {
      inputError.textContent = input.validationMessage;
      inputError.classList.add(this._errorClass);
      input.classList.add(this._inputErrorClass);
    }
  }

  // меняем кнопку сохранить в зависимости от valid-состояния елементов формы
  _setFormValidStatus() {
    const notValid = Array.from(this._form.elements).some(el => !el.validity.valid);

    this._saveButton.disabled = notValid;
    this._saveButton.classList.toggle(this._inactiveButtonClass, notValid);
  }

  // обработчик 'input'
  _onFormInput(input) {
    if (input.classList.contains(this._inputSelector)) {
      this._setInputValidStatus(input, input.validity.valid);
    }
    this._setFormValidStatus();
  }
}
