const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const closeButton = document.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');

const nameEdit = document.querySelector('.popup__item_type_name');
const descEdit = document.querySelector('.popup__item_type_desc');

function openForm() {
  nameEdit.value = profileName.textContent;
  descEdit.value = profileDesc.textContent;
  popup.classList.add('popup_opened');
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function saveAndCloseForm(e) {
  e.preventDefault();
  profileName.textContent = nameEdit.value;
  profileDesc.textContent = descEdit.value;
  closeForm();
}

profileEdit.addEventListener('click', (event) => {
  openForm()
});

closeButton.addEventListener('click', closeForm);

popupForm.addEventListener('submit', saveAndCloseForm);
