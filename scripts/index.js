// попап редактирования профиля
const popupEditProfile      = document.querySelector('.popup_type_edit-profile');
const formEditProfile       = popupEditProfile.querySelector('.popup__form');
const inputProfileName      = formEditProfile.querySelector('.popup__item_type_name');
const inputProfileDesc      = formEditProfile.querySelector('.popup__item_type_desc');

// поля отображения профиля на странице
const nodeProfileName       = document.querySelector('.profile__name');
const nodeProfileDesc       = document.querySelector('.profile__desc');

// попап добавления елемента
const popupAddElement       = document.querySelector('.popup_type_add-element');
const formAddElement        = popupAddElement.querySelector('.popup__form');
const inputElementName      = formAddElement.querySelector('.popup__item_type_place-name');
const inputElementImageUrl  = formAddElement.querySelector('.popup__item_type_place-image-url');

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

// ФУНКЦИИ ---------------------------

// функции открытия/закрытия попапа
const openPopup     = popup => { popup.classList.add('popup_opened') };
const closePopup    = popup => { popup.classList.remove('popup_opened') };

// обработчик открытия попапа редактирования профиля
function openFormEditProfile(event) {
  inputProfileName.value = nodeProfileName.textContent;
  inputProfileDesc.value = nodeProfileDesc.textContent;
  openPopup(popupEditProfile);
}

// обработчик кнопки сохранить попапа редактирования профиля
function saveAndCloseFormEditProfile(event) {
  event.preventDefault();
  nodeProfileName.textContent = inputProfileName.value;
  nodeProfileDesc.textContent = inputProfileDesc.value;
  closePopup(popupEditProfile);
}

// обработчик открытия попапа добавления элемента
function openFormAddElement() {
  inputElementName.value = '';
  inputElementImageUrl.value = null;
  openPopup(popupAddElement);
}

// обработчик закрытия с сохранением попапа добавления элемента
function saveAndCloseFormAddElement(event) {
  event.preventDefault();
  renderElement(addNewElement({ name: inputElementName.value, link: inputElementImageUrl.value }));
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
formEditProfile.addEventListener('submit', saveAndCloseFormEditProfile);

// определяем события попапа добавления элемента
document.querySelector('.profile__add').addEventListener('click', openFormAddElement);
formAddElement.addEventListener('submit', saveAndCloseFormAddElement);

// навешиваем событие по клику на все кнопки закрытия попапов
document.querySelectorAll('.popup__close-button').forEach(close => {
  close.addEventListener('click', event => { closePopup(event.target.closest('.popup')) })
});

// инициализируем элементы ------------------
initialCards.map(addNewElement).forEach(renderElement);
