// функции открытия/закрытия попапа
const openPopup     = popup => { popup.classList.add('popup_opened') };
const closePopup    = popup => { popup.classList.remove('popup_opened') };

// ----- попап редактирования профиля BEGIN
const editProfilePopup      = document.querySelector('.popup_type_edit-profile');
const editProfileForm       = editProfilePopup.querySelector('.popup__form');
const profileNameEdit       = editProfileForm.querySelector('.popup__item_type_name');
const profileDescEdit       = editProfileForm.querySelector('.popup__item_type_desc');
// поля отображения профиля на странице
const profileName           = document.querySelector('.profile__name');
const profileDesc           = document.querySelector('.profile__desc');

function openEditProfileForm(event) {
  profileNameEdit.value = profileName.textContent;
  profileDescEdit.value = profileDesc.textContent;
  openPopup(editProfilePopup);
}

function saveAndCloseEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = profileNameEdit.value;
  profileDesc.textContent = profileDescEdit.value;
  closePopup(editProfilePopup);
}

document.querySelector('.profile__edit').addEventListener('click', openEditProfileForm);
editProfileForm.addEventListener('submit', saveAndCloseEditProfileForm);
// ----- попап редактирования профиля END

// ----- попап добавления елемента BEGIN
const addElementPopup       = document.querySelector('.popup_type_add-element');
const addElementForm        = addElementPopup.querySelector('.popup__form');
const elementNameEdit       = addElementForm.querySelector('.popup__item_type_place-name');
const elementImageUrlEdit   = addElementForm.querySelector('.popup__item_type_place-image-url');

function openAddElementForm() {
  elementNameEdit.value = null;
  elementImageUrlEdit.value = null;
  openPopup(addElementPopup);
}

function saveAndCloseAddElementForm(event) {
  event.preventDefault();
  elementAdd({ name: elementNameEdit.value, link: elementImageUrlEdit.value });
  closePopup(addElementPopup);
}

document.querySelector('.profile__add').addEventListener('click', openAddElementForm);
addElementForm.addEventListener('submit', saveAndCloseAddElementForm);
// ----- попап добавления елемента END

// навешиваем событие по клику на все кнопки закрытия попапов
document.querySelectorAll('.popup__close-button').forEach(close => {
  close.addEventListener('click', event => { closePopup(event.target.parentElement.parentElement) })
});

// ----- массив елементов BEGIN
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

const elementsContainer = document.querySelector('.elements');
const elementTemlate    = document.querySelector('#element-template').content;

// функция добавления элемента
function elementAdd(elementData) {
  const elementNode         = elementTemlate.querySelector('.element').cloneNode(true);
  const elementImage        = elementNode.querySelector('.element__image');
  const elementCaptionText  = elementNode.querySelector('.element__caption-text');
  const figurePopup         = document.querySelector('.popup_type_image');
  const figureImage         = figurePopup.querySelector('.popup__image');
  const figureCaption       = figurePopup.querySelector('.popup__image-caption');

  // заполняем данные
  elementImage.src = elementData.link;
  elementImage.alt = elementData.name;
  elementCaptionText.textContent = elementData.name;

  // добавляем события
  // открытие попапа
  elementImage.addEventListener('click', event => {
    figureImage.src = elementData.link;
    figureImage.alt = elementData.name;
    figureCaption.textContent = elementData.name;
    openPopup(figurePopup);
  });
  // лайк
  elementNode.querySelector('.element__button-like').addEventListener('click', event => {
    event.target.classList.toggle('element__button-like_active');
  });
  // удаление
  elementNode.querySelector('.element__button-delete').addEventListener('click', () => {
    elementNode.remove()
  });

  elementsContainer.prepend(elementNode);
}

initialCards.forEach(elementAdd);
// ----- массив елементов END
