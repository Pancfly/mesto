import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {validationSettings, photoGallery, forms, popupElementEdit, popupFormEdit, popupEditClose, popupEditSubmit,
        inputName, inputAbout, popupEditOpen, profileName, profileAbout, popupElements, popupFormAdd,
        popupAddClose, buttonAddSubmit, cardName, cardLink, popupAddOpen, templateElements} from './consts.js';

/*вставить карточку в галерею*/
function placementCard (element) {
    const card = new Card(element, templateElements);
    const cardElement = card.generateCard();
    photoGallery.prepend(cardElement);
}

/*вывести карточку*/
initialCards.forEach(element => {
    placementCard(element);
})

/*Esc ф-я*/
function handlerEscKey(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape' || evt.key === 'Esc') {
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
    setDefaultErrorState(element);
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

/*убрать сообщения об ошибках*/
function setDefaultErrorState(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll('.popup__text'));
    formInputs.forEach( inputElement => {
        if (inputElement.matches('.popup__text_type_error')) {
            const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove('popup__text_type_error');
            errorElement.classList.remove('popup__text-error_active');
            errorElement.textContent = '';
        }
    })
}

/*изменить состояние кнопки*/
function toggleSubmitButtonState(buttonElement, flag) {
    if (flag === true) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('popup__button_submit-inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_submit-inactive');
    }
}

/*Ф-и открытия и закрытия*/
function openProfilePopup() {
    toggleSubmitButtonState(popupEditSubmit, false);
    initializeProfileInfo();
    openPopup(popupElementEdit);
}

function openPopupElements() {
    toggleSubmitButtonState(buttonAddSubmit, true);
    emptyInputValue(popupFormAdd);
    openPopup(popupElements);
}

function closeProfilePopup() {
    closePopup(popupElementEdit);
}

function closePopupElements() {
    closePopup(popupElements);
}

/*Ф-я редактирования данных профиля*/
function editNameAbout (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeProfilePopup();
}

/*Ф-я редактирования данных карточки*/
function editInfoElements (evt) {
    evt.preventDefault();
    const element = {
      name: cardName.value,
      link: cardLink.value,
    };
    placementCard(element);
    closePopupElements(popupElements);
}

forms.forEach( formItem => {
    const validator = new FormValidator(validationSettings, formItem);
    validator.enableValidation();
})

popupEditOpen.addEventListener('click', openProfilePopup);
popupEditClose.addEventListener('click', closeProfilePopup);
popupFormEdit.addEventListener('submit', editNameAbout);
popupAddOpen.addEventListener('click', openPopupElements);
popupAddClose.addEventListener('click', closePopupElements);
popupFormAdd.addEventListener('submit', editInfoElements);