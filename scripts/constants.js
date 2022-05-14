// массив елементов для инициализации
const initialCards = [
  {
    name: 'Памятник Жукову',
    link: './images/elements/Zhukov_monument.jpg'
  },
  {
    name: 'Успенский собор',
    link: './images/elements/Assumption_Cathedral.jpg'
  },
  {
    name: 'Могила неизвестному солдату',
    link: './images/elements/eternal_flame.jpg'
  },
  {
    name: 'Коломна, Кремлевская стена',
    link: './images/elements/Kolomna_kremlin_wall.jpg'
  },
  {
    name: 'Москва Сити',
    link: './images/elements/Moskva_city.jpg'
  },
  {
    name: 'ВДНХ',
    link: './images/elements/VDNH.jpg'
  }
];

// объект для инициализации валидации
const validationConfig =
  {
    formSelector: '.popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass:'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  };

const ESC_KEY = 'Escape';

export { initialCards, validationConfig, ESC_KEY };
