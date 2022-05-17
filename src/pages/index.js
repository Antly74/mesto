import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../components/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// попап отображения картинки
const popupWithImage = new PopupWithImage('.popup_type_image');

// экземпляр для добавления элементов в DOM
const section = new Section(
  { items: initialCards,
    renderer: (elementData) => {
      const card = new Card(
        elementData,
        'element-template',
        (link, name) => {
          popupWithImage.open(link, name);
        }
      );
      return card.generate();
    }
  },
  '.elements'
);

// объект для отображения профиля
const userInfo = new UserInfo('.profile__name', '.profile__desc');

// попап редактирования профиля
const profileEditForm = document.forms.profileEditForm;
const profileNameInput = profileEditForm.elements.profileName;
const profileDescInput = profileEditForm.elements.profileDesc;
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);
const popupEditProfile = new PopupWithForm (
  '.popup_type_edit-profile',
  validationConfig.formSelector,
  () => {
    const { name, desc } = userInfo.getUserInfo();
    profileNameInput.value = name;
    profileDescInput.value = desc;
    profileEditFormValidator.initForm();
  },
  () => {
    userInfo.setUserInfo(profileNameInput.value, profileDescInput.value);
  }
);

// попап добавления елемента
//const popupAddCard = document.querySelector('.popup_type_add-element');
const cardAddForm = document.forms.cardAddForm;
const cardNameInput = cardAddForm.elements.elementName;
const cardImageUrlInput = cardAddForm.elements.elementImageUrl;
const cardAddFormValidator = new FormValidator(validationConfig, cardAddForm);
const popupAddCard = new PopupWithForm (
  '.popup_type_add-element',
  validationConfig.formSelector,
  () => {
    cardAddFormValidator.initForm();
  },
  () => {
    section.addItem({ name: cardNameInput.value, link: cardImageUrlInput.value });
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
