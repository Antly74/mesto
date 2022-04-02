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
  openPopup(addElementPopup);
}

function saveAndCloseAddElementForm(event) {
  event.preventDefault();
  closePopup(addElementPopup);
}

document.querySelector('.profile__add').addEventListener('click', openAddElementForm);
addElementForm.addEventListener('submit', saveAndCloseAddElementForm);
// ----- попап добавления елемента END

// навешиваем событие по клику на все кнопки закрытия попапов
document.querySelectorAll('.popup__close-button').forEach(close => {
  close.addEventListener('click', event => { closePopup(event.target.parentElement.parentElement) })
});
