import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {photoGallery, popupElementEdit, popupFormEdit, popupEditClose, inputName, inputAbout, popupEditOpen,
        profileName, profileAbout, popupElements, popupFormAdd, popupAddClose, cardName, cardLink, popupAddOpen,
        templateElements, popupFullscreen, popupFullscreenClose, validatorProfile, validatorElements} from './consts.js';

/*вкючаем валидацию*/
validatorProfile.enableValidation();
validatorElements.enableValidation();

/*создать карточку*/
function createCard (element) {
    const card = new Card(element, templateElements);

    return card.generateCard();
}

/*добавить карточку в галерею*/
function addGalleryCard(element, where = 'prepend') {
    if (where === 'append') {
        photoGallery.append(createCard(element));
    } else if (where === 'prepend') {
        photoGallery.prepend(createCard(element));
    }
}

/*вывести карточку*/
initialCards.forEach(element => {
    addGalleryCard(element, 'prepend');
})

/*Esc ф-я*/
function handlerEscKey(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        const popupIsOpened = document.querySelector('.popup_is-opened');
        closePopup(popupIsOpened);
    }
}

/*Закрытие popup при клике на пустое место*/
function handlerEvent(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

/*Ф-я открытия popup*/
export function openPopup(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', handlerEvent);
    document.addEventListener('keydown', handlerEscKey);
}

/*Ф-я закрытия popup*/
export function closePopup(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('click', handlerEvent);
    document.removeEventListener('keydown', handlerEscKey);
}

/*Ф-и упрощения*/
function initializeProfileInfo() {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

function emptyInputValue(element) {
    const inputs = Array.from(element.querySelectorAll('.popup__text'));
    inputs.forEach(elem => {
        elem.value = '';
    })
}

/*Ф-и открытия и закрытия*/
function openProfilePopup() {
    validatorProfile.setDefaultErrorState();
    initializeProfileInfo();
    openPopup(popupElementEdit);
}

function openPopupElements() {
    validatorElements.setDefaultErrorState();
    emptyInputValue(popupFormAdd);
    openPopup(popupElements);
}

function closeProfilePopup() {
    closePopup(popupElementEdit);
}

function closePopupElements() {
    closePopup(popupElements);
}

function closeFullscreenCard() {
    closePopup(popupFullscreen);
}

/*Ф-я редактирования данных профиля*/
function editNameAbout(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeProfilePopup();
}

/*Ф-я редактирования данных карточки*/
function editInfoElements(evt) {
    evt.preventDefault();
    const element = {
      name: cardName.value,
      link: cardLink.value,
    };
    addGalleryCard(element);
    closePopupElements(popupElements);
}

popupEditOpen.addEventListener('click', openProfilePopup);
popupEditClose.addEventListener('click', closeProfilePopup);
popupFormEdit.addEventListener('submit', editNameAbout);
popupAddOpen.addEventListener('click', openPopupElements);
popupAddClose.addEventListener('click', closePopupElements);
popupFormAdd.addEventListener('submit', editInfoElements);
popupFullscreenClose.addEventListener('click', closeFullscreenCard);