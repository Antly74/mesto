import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../components/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  authorization: 'ea06fae9-cbb3-4f2c-858d-1af4a992ff90'
});

// объект для отображения профиля
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescSelector: '.profile__desc',
  profileAvatarSelector: '.profile__avatar'
});

const createCard = (elementData) => {
  const card = new Card(
    elementData,
    userInfo.getMe(),
    'element-template',
    { handleCardClick: (elementLink, elementName) => {
        popupWithImage.open(elementLink, elementName);
      },
      handleCardDelete: (cardId) => {
        popupConfirm.setInputsValue({cardId});
        popupConfirm.card = card;
        popupConfirm.open();
      },
      handleCardLike: (cardId, isLiked) => {
        api.toggleLikes(cardId, isLiked)
          .then(info => {
            card.setLikes(info);
            card.renderLikes();
          })
          .catch(err => console.log(err))
      }
    }
  );
  return card.generate();
}

// попап отображения картинки
const popupWithImage = new PopupWithImage('.popup_type_image');

// экземпляр для добавления элементов в DOM
const section = new Section(
  elementData => section.addItem(createCard(elementData)),
  '.elements'
);

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
    popup.renderLoading(true);
    api.patchUserInfo({name: profileName, about: profileDesc})
      .then(info => {
        userInfo.setUserInfo(info);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popup.close();
        popup.renderLoading(false);
      });
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
    popup.renderLoading(true);
    api.postCard({name: elementName, link: elementLink})
      .then(info => {
        section.addItem(createCard(info));
      })
      .catch(err => console.log(err))
      .finally(() => {
        popup.close();
        popup.renderLoading(false);
      });
  }
);

// попап обновления аватара
const avatarUpdateForm = document.forms.avatarUpdateForm;
const avatarUpdateFormValidator = new FormValidator(validationConfig, avatarUpdateForm);
const popupAvatarUpdate = new PopupWithForm (
  '.popup_type_update-avatar',
  validationConfig,
  () => {
    avatarUpdateFormValidator.initForm();
  },
  ({ avatar }, popup) => {
    popup.renderLoading(true);
    api.patchAvatar(avatar)
      .then(info => {
        userInfo.setAvatar(info.avatar);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popup.close();
        popup.renderLoading(false);
      });
  }
);

const popupConfirm = new PopupWithForm (
  '.popup_type_confirm',
  validationConfig,
  () => {},
  ({cardId}, popup) => {
    popup.renderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        popup.card.delete();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popup.close();
        popup.renderLoading(false);
      });
  }
);

// ОБРАБОТЧИКИ ------------------
// кнопка редактирования профиля
document.querySelector('.profile__edit').addEventListener('click', () => popupEditProfile.open());
// кнопка добавления карточки
document.querySelector('.profile__add').addEventListener('click', () => popupAddCard.open());
// кнопка добавления карточки
document.querySelector('.profile__avatar').addEventListener('click', () => popupAvatarUpdate.open());

// инициализируем элементы ------------------
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupAvatarUpdate.setEventListeners();
popupConfirm.setEventListeners();

profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
avatarUpdateFormValidator.enableValidation();

api.getUserInfo()
  .then(info => {
    userInfo.setUserInfo(info);
    userInfo.setAvatar(info.avatar);
    return api.getInitialCards();
  })
  .then(initialCards => {
    section.renderAll(initialCards);
  })
  .catch(err => console.log(err));
