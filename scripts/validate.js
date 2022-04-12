// объект для инициализации
const validationConfig =
  {
    formSelector:           '.popup__form',
    inputSelector:          'popup__input',
    submitButtonSelector:   '.popup__save-button',
    inactiveButtonClass:    'popup__save-button_disabled',
    inputErrorClass:        'popup__input_type_error',
    errorClass:             'popup__input-error_visible'
  };

// отображаем или скрываем ошибку у поля ввода в зависимости от valid-состояния
const setInputValidStatus = (input, inputErrorClass, errorClass, valid) => {
  const inputError = input.form.querySelector(`#${input.id}-error`);
  if (valid) {
    inputError.textContent = '';
    inputError.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  } else {
    inputError.textContent = input.validationMessage;
    inputError.classList.add(validationConfig.errorClass);
    input.classList.add(inputErrorClass);
  }
}

// предопределяем переменную для сохранения функции инициализации формы при открытии попапа
let setFormValidStatusOnOpenPopup;

// меняем кнопку сохранить в зависимости от valid-состояния елементов формы
const setFormValidStatus = (form, inactiveButtonClass, submitButtonSelector) => {
  const saveButton = form.querySelector(submitButtonSelector);
  const notValid = Array.from(form.elements).some(el => !el.validity.valid);

  saveButton.disabled = notValid;
  saveButton.classList.toggle(inactiveButtonClass, notValid);
}

// функция инициализатор валидатора
const enableValidation = (config) => {
  const forms = Array.from(document.forms);

  forms.forEach(form => {
    // добавляем обработчик на событие input
    form.addEventListener('input', (event) => {
      const {target, currentTarget} = event;
      if (target.classList.contains(config.inputSelector)) {
        setInputValidStatus(target, config.inputErrorClass, config.errorClass, target.validity.valid);
      }
      setFormValidStatus(currentTarget, config.inactiveButtonClass, config.submitButtonSelector);
    });
  });

  // инициализируем функцию для открытия попапа
  setFormValidStatusOnOpenPopup = (popup) => {
    const form = popup.querySelector(config.formSelector);
    // у попапа может не быть формы, поэтому проверяем наличие
    if (form) {
      // инициализируем статус формы
      setFormValidStatus(form, config.inactiveButtonClass, config.submitButtonSelector);
      // сбрасываем элементы формы, чтобы пока пользователь не начал ввод, ошибка не отображалась
      Array.from(form.elements).forEach(element => {
        if (element.classList.contains(config.inputSelector)) {
          setInputValidStatus(element, config.inputErrorClass, config.errorClass, true)
        }
      });
    }
  }
}

// инициализируем валидатор с настройками
enableValidation(validationConfig);
