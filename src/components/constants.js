import Zhukov_monument from '../images/elements/Zhukov_monument.jpg';
import Assumption_Cathedral from '../images/elements/Assumption_Cathedral.jpg';
import eternal_flame from '../images/elements/eternal_flame.jpg';
import Kolomna_kremlin_wall from '../images/elements/Kolomna_kremlin_wall.jpg';
import Moskva_city from '../images/elements/Moskva_city.jpg';
import VDNH from '../images/elements/VDNH.jpg';

// массив елементов для инициализации
const initialCards = [
  {
    name: 'Памятник Жукову',
    link: Zhukov_monument
  },
  {
    name: 'Успенский собор',
    link: Assumption_Cathedral
  },
  {
    name: 'Могила неизвестному солдату',
    link: eternal_flame
  },
  {
    name: 'Коломна, Кремлевская стена',
    link: Kolomna_kremlin_wall
  },
  {
    name: 'Москва Сити',
    link: Moskva_city
  },
  {
    name: 'ВДНХ',
    link: VDNH
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
