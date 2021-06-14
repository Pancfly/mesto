/*объявление*/
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const popupEditOpen = profile.querySelector('.profile__button_action_edit');
const popupElement = document.querySelector('.popup');
const popupEditClose = popupElement.querySelector('.popup__button_close');
const popupEditSubmit = popupElement.querySelector('.popup__button_submit');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popupElement.querySelector('.popup__text_type_name');
let inputAbout = popupElement.querySelector('.popup__text_type_about');

/*передача значений из ячеек блока profile в ячейки блока popup*/
inputName.value = profileName.textContent;
inputAbout.value = profileAbout.textContent;

/*открытие*/
function openPopup() {
    popupElement.classList.add('popup_is-opened');
}

/*закрытие*/
function closePopup() {
    popupElement.classList.remove('popup_is-opened');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

/*редактирование с сохранением*/
function editNameAbout(event) {
    if (event.target === popupEditSubmit) {
        profileName.textContent = inputName.value;
        profileAbout.textContent = inputAbout.value;
        closePopup();
    }
}

/*вызов*/
popupEditOpen.addEventListener('click', openPopup);
popupEditClose.addEventListener('click', closePopup);
popupEditSubmit.addEventListener('click', editNameAbout);