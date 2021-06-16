/*объявление*/
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const popupEditOpen = profile.querySelector('.profile__button_action_edit');
const popupElement = document.querySelector('.popup');
const popupEditClose = popupElement.querySelector('.popup__button_close');
const popupForm = popupElement.querySelector('.popup__input');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popupForm.querySelector('.popup__text_type_name');
let inputAbout = popupForm.querySelector('.popup__text_type_about');

/*открытие*/
function openPopup() {
    popupElement.classList.add('popup_is-opened');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

/*закрытие*/
function closePopup() {
    popupElement.classList.remove('popup_is-opened');
}

/*редактирование с сохранением*/
function editNameAbout (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup();
}

/*вызов*/
popupEditOpen.addEventListener('click', openPopup);
popupEditClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editNameAbout);