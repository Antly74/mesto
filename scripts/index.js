const profileEdit = document.querySelector('.profile__edit');
const editForm = document.querySelector('.edit-form');
const closeButton = document.querySelector('.edit-form__close-button');
const saveButton = document.querySelector('.edit-form__save-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');

const nameEdit = document.querySelector('#name');
const descEdit = document.querySelector('#desc');

const ESC_KEY = "Escape";
function openForm() {
  nameEdit.value = profileName.textContent;
  descEdit.value = profileDesc.textContent;
  editForm.classList.add('edit-form_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closeForm() {
  editForm.classList.remove('edit-form_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function saveAndCloseForm() {
  profileName.textContent = nameEdit.value;
  profileDesc.textContent = descEdit.value;
  closeForm();
}

function onDocumentKeyUp(event){
  if (event.key === ESC_KEY) {
    closeForm();
  }
}

profileEdit.addEventListener('click', (event) => {
  openForm()
});

closeButton.addEventListener('click', closeForm);

saveButton.addEventListener('click', saveAndCloseForm);


