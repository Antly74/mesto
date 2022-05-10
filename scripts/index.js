import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

// попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileEditForm = document.forms.profileEditForm;
const profileNameInput = profileEditForm.elements.profileName;
const profileDescInput = profileEditForm.elements.profileDesc;
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);

// поля отображения профиля на странице
const profileNameNode = document.querySelector('.profile__name');
const profileDescNode = document.querySelector('.profile__desc');

// попап добавления елемента
const popupAddCard = document.querySelector('.popup_type_add-element');
const cardAddForm = document.forms.cardAddForm;
const cardNameInput = cardAddForm.elements.elementName;
const cardImageUrlInput = cardAddForm.elements.elementImageUrl;
const cardAddFormValidator = new FormValidator(validationConfig, cardAddForm);

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

// переменные секции элементы
const cardList = document.querySelector('.elements');

const ESC_KEY = 'Escape';

// ФУНКЦИИ ---------------------------

// функции открытия/закрытия попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.key === ESC_KEY) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// обработчик открытия попапа редактирования профиля
function openFormEditProfile(event) {
  profileNameInput.value = profileNameNode.textContent;
  profileDescInput.value = profileDescNode.textContent;
  openPopup(popupEditProfile);
  profileEditFormValidator.initForm();
}

// обработчик кнопки сохранить попапа редактирования профиля
function saveAndCloseFormEditProfile(event) {
  event.preventDefault();
  profileNameNode.textContent = profileNameInput.value;
  profileDescNode.textContent = profileDescInput.value;
  closePopup(popupEditProfile);
}

// обработчик открытия попапа добавления элемента
function openFormAddElement() {
  cardAddForm.reset();
  openPopup(popupAddCard);
  cardAddFormValidator.initForm();
}

// обработчик закрытия с сохранением попапа добавления элемента
function saveAndCloseFormAddElement(event) {
  event.preventDefault();
  renderElement(addNewElement({ name: cardNameInput.value, link: cardImageUrlInput.value }));
  closePopup(popupAddCard);
}

// добавление элемента
function addNewElement(elementData) {
  const card = new Card(elementData, 'element-template');
  return card.generate();
}

// добавление элемента в DOM
function renderElement(nodeElement) {
  cardList.prepend(nodeElement)
}

// ОБРАБОТЧИКИ ------------------

// определяем события попапа редактирования профиля
document.querySelector('.profile__edit').addEventListener('click', openFormEditProfile);
profileEditForm.addEventListener('submit', saveAndCloseFormEditProfile);

// определяем события попапа добавления элемента
document.querySelector('.profile__add').addEventListener('click', openFormAddElement);
cardAddForm.addEventListener('submit', saveAndCloseFormAddElement);

// навешиваем событие по клику на все кнопки закрытия попапов
document.querySelectorAll('.popup__close-button').forEach(closeBtn => {
  closeBtn.addEventListener('click', event => closePopup(event.target.closest('.popup')))
});
// навешиваем событие по клику на оверлей попапов
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', event => { if (event.target === event.currentTarget) { closePopup(event.target) } })
});

// инициализируем элементы ------------------
initialCards.map(addNewElement).forEach(renderElement);

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
