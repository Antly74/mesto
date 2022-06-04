import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../components/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const createCard = (elementData) => {
  const card = new Card(
    elementData,
    'element-template',
    (elementLink, elementName) => {
      popupWithImage.open(elementLink, elementName);
    }
  );
  return card.generate();
}

// попап отображения картинки
const popupWithImage = new PopupWithImage('.popup_type_image');

// экземпляр для добавления элементов в DOM
const section = new Section(
  {
    items: initialCards,
    renderer: elementData => section.addItem(createCard(elementData))
  },
  '.elements'
);

// объект для отображения профиля
const userInfo = new UserInfo('.profile__name', '.profile__desc');

// попап редактирования профиля
const profileEditForm = document.forms.profileEditForm;
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);
const popupEditProfile = new PopupWithForm (
  '.popup_type_edit-profile',
  validationConfig,
  (popup) => {
    popup.setInputsValue(userInfo.getUserInfo());
    profileEditFormValidator.initForm();
  },
  ({ profileName, profileDesc }, popup) => {
    userInfo.setUserInfo(profileName, profileDesc);
    popup.close();
  }
);

// попап добавления элемента
const cardAddForm = document.forms.cardAddForm;
const cardAddFormValidator = new FormValidator(validationConfig, cardAddForm);
const popupAddCard = new PopupWithForm (
  '.popup_type_add-element',
  validationConfig,
  () => {
    cardAddFormValidator.initForm();
  },
  ({ elementName, elementLink }, popup) => {
    section.addItem(createCard({ elementName, elementLink }));
    popup.close();
  }
);

// ОБРАБОТЧИКИ ------------------
// кнопка редактирования профиля
document.querySelector('.profile__edit').addEventListener('click', () => popupEditProfile.open());
// кнопка добавления карточки
document.querySelector('.profile__add').addEventListener('click', () => popupAddCard.open());

// инициализируем элементы ------------------
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

section.renderAll();
