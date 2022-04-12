// попап редактирования профиля
const popupEditProfile      = document.querySelector('.popup_type_edit-profile');
const profileEditForm       = document.forms.profileEditForm; // popupEditProfile.querySelector('.popup__form');
const profileNameInput      = profileEditForm.elements.profileName; // querySelector('.popup__input_type_name');
const profileDescInput      = profileEditForm.elements.profileDesc; // querySelector('.popup__input_type_desc');

// поля отображения профиля на странице
const profileNameNode       = document.querySelector('.profile__name');
const profileDescNode       = document.querySelector('.profile__desc');

// попап добавления елемента
const popupAddElement       = document.querySelector('.popup_type_add-element');
const elementAddForm        = document.forms.elementAddForm; // popupAddElement.querySelector('.popup__form');
const elementNameInput      = elementAddForm.elements.elementName; // querySelector('.popup__input_type_place-name');
const elementImageUrlInput  = elementAddForm.elements.elementImageUrl; // querySelector('.popup__input_type_place-image-url');

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
const containerElements = document.querySelector('.elements');
const templateElement   = document.querySelector('#element-template').content;
const popupFigure       = document.querySelector('.popup_type_image');
const nodeFigureImage   = popupFigure.querySelector('.popup__image');
const nodeFigureCaption = popupFigure.querySelector('.popup__image-caption');

const ESC_KEY = 'Escape';

// ФУНКЦИИ ---------------------------

// функции открытия/закрытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
  setFormValidStatusOnOpenPopup(popup);
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
  elementNameInput.value = '';
  elementImageUrlInput.value = '';
  openPopup(popupAddElement);
}

// обработчик закрытия с сохранением попапа добавления элемента
function saveAndCloseFormAddElement(event) {
  event.preventDefault();
  renderElement(addNewElement({ name: elementNameInput.value, link: elementImageUrlInput.value }));
  closePopup(popupAddElement);
}

// обработчик открытия попапа с картинкой
function openPopupImage (event) {
  nodeFigureImage.src = event.target.src;
  nodeFigureImage.alt = event.target.alt;
  nodeFigureCaption.textContent = event.target.alt;
  openPopup(popupFigure);
}

// добавление элемента
function addNewElement(elementData) {
  const nodeElement         = templateElement.querySelector('.element').cloneNode(true);
  const elementImage        = nodeElement.querySelector('.element__image');
  const elementCaptionText  = nodeElement.querySelector('.element__caption-text');

  // заполняем данные
  elementImage.src = elementData.link;
  elementImage.alt = elementData.name;
  elementCaptionText.textContent = elementData.name;

  // добавляем события
  // открытие попапа
  elementImage.addEventListener('click', openPopupImage);
  // лайк
  nodeElement.querySelector('.element__button-like').addEventListener('click', event => {
    event.target.classList.toggle('element__button-like_active');
  });
  // удаление
  nodeElement.querySelector('.element__button-delete').addEventListener('click', () => {
    nodeElement.remove()
  });

  return nodeElement;
}

// добавление элемента в DOM
function renderElement(nodeElement) {
  containerElements.prepend(nodeElement);
}

// ОБРАБОТЧИКИ ------------------

// определяем события попапа редактирования профиля
document.querySelector('.profile__edit').addEventListener('click', openFormEditProfile);
profileEditForm.addEventListener('submit', saveAndCloseFormEditProfile);

// определяем события попапа добавления элемента
document.querySelector('.profile__add').addEventListener('click', openFormAddElement);
elementAddForm.addEventListener('submit', saveAndCloseFormAddElement);

// навешиваем событие по клику на все кнопки закрытия попапов
document.querySelectorAll('.popup__close-button').forEach(close => {
  close.addEventListener('click', event => { closePopup(event.target.closest('.popup')) })
});
// навешиваем событие по клику на оверлей попапов
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', event => { if (event.target === event.currentTarget) { closePopup(event.target) } })
});

// инициализируем элементы ------------------
initialCards.map(addNewElement).forEach(renderElement);
