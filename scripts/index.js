/*объявление*/
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const popupEditOpen = profile.querySelector('.profile__button_action_edit');
const popupList = document.querySelectorAll('.popup');
const popupElementEdit = document.querySelector('.popup-edit');
const popupEditClose = popupElementEdit.querySelector('.popup__button_close-edit');
const popupFormEdit = popupElementEdit.querySelector('.popup__profile-form');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popupFormEdit.querySelector('.popup__text_type_name');
let inputAbout = popupFormEdit.querySelector('.popup__text_type_about');

/*elements*/
const popupElements = document.querySelector('.popup-add');
const cardData = document.querySelector('.popup__elements-form');
const popupOpenButtonElement = document.querySelector('.profile__button_action_add');
const popupCloseButtonElement = document.querySelector('.popup__button_close-add');
const elements = document.querySelector('.elements__list');
const templateElements = document.querySelector('.template-elements');
const cardTitle = cardData.querySelector('.popup__card-name');
const cardImageSrc = cardData.querySelector('.popup__card-src');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*переменные fullscreen попапа*/
const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const fullscreenImage = document.querySelector('.popup__fullscreen-image');
const fullscreenText = document.querySelector('.popup__fullscreen-text');
const fullscreenCloseButton = document.querySelector('.popup__button_close-fullscreen');

/*константа*/
const escKeyCode = 'Escape';
const openPopupSelector = 'popup_is-opened';

/*ф-я слушатель*/
function addEventListeners (element) {
    element.querySelector('.elements__button_delete').addEventListener('click', deleteCard);
    element.querySelector('.elements__button_like').addEventListener('click', likeCard);
    element.querySelector('.elements__image').addEventListener('click', openFullscreen);
}

/*ф-и elements*/
function createCard(cardData) {
    const element = templateElements.content.cloneNode(true);
    const elementTitle = element.querySelector('.elements__title');
    const elementImage = element.querySelector('.elements__image');
    elementTitle.textContent = cardData.name;
    elementImage.src = cardData.link;
    elementImage.alt = cardData.name;
    addEventListeners(element);
    return element;
}

function placementCard (element) {
    elements.prepend(element);
}

initialCards.forEach(cardData => {
    const element = createCard(cardData);
    placementCard(element);
})

function deleteCard (evt) {
    const element = evt.target.closest('.elements__element')
    element.remove();
}

function likeCard (evt) {
    evt.target.classList.toggle('elements__button_like-active');
}

function editInfoElements (event) {
    event.preventDefault();
    const element = createCard({
      name: cardTitle.value,
      link: cardImageSrc.value,
    });
    closePopupElements(popupElements);
    placementCard(element);
}

/*Esc ф-я*/
function handlerEscKey(evt) {
    if (evt.key === escKeyCode) {
        if (popupElements.classList.contains(openPopupSelector)) {
            closePopup(popupElements);
        } else if (popupElementEdit.classList.contains(openPopupSelector)) {
            closePopup(popupElementEdit);
        } else if (popupFullscreen.classList.contains(openPopupSelector)) {
            closePopup(popupFullscreen);
        }
    }
}

popupList.forEach(popup => {
    popup.addEventListener('keydown', handlerEscKey)
})

/*Закрытие popup при клике на пустое место*/
function handlerEvent(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
  }

function addInputListener(element) {
    const formInputs = Array.from(element.querySelectorAll('.popup__text'));
    formInputs.forEach(element => {
        element.addEventListener('input', listenerEventInput);
    })
}

function removeInputListener(element) {
    const formInputs = Array.from(element.querySelectorAll('.popup__text'));
    formInputs.forEach(element => {
        element.removeEventListener('input', listenerEventInput);
    })
}

/*Ф-я убирающая сообщение об ошибке*/
function setDefaultErrorState(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
    inputList.forEach((inputElement) => {
    if (inputElement.matches('.popup__text_type_error')) {
        hideInputError(formElement, inputElement);
    };
  });
}

/*Ф-я открытия popup*/
function openPopup(element) {
    addInputListener(element);
    element.classList.add('popup_is-opened');
    element.addEventListener('click', handlerEvent);
    document.addEventListener('keydown', handlerEscKey);
}

/*Ф-я закрытия popup*/
function closePopup(element) {
    removeInputListener(element);
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

/*Ф-и открытия и закрытия с проверкой валидности*/
function openProfilePopup() {
    initializeProfileInfo()
    openCheckValidity(popupFormEdit);
    openPopup(popupElementEdit);
}

function openPopupElements() {
    emptyInputValue(cardData);
    openCheckValidity(cardData);
    openPopup(popupElements);
}

function openFullscreen(evt) {
    const element = evt.target.closest('.elements__image');
    fullscreenImage.src = element.src;
    fullscreenText.textContent = element.alt;
    openPopup(popupFullscreen);
}

function closeProfilePopup() {
    closePopup(popupElementEdit);
    setDefaultErrorState(popupFormEdit)
}

function closePopupElements() {
    closePopup(popupElements);
    setDefaultErrorState(cardData);
}

function closeFullscreen() {
    closePopup(popupFullscreen);
}

/*Ф-я редактирования данных профиля*/
function editNameAbout (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeProfilePopup();
}

/*вызов*/
popupEditOpen.addEventListener('click', openProfilePopup);
popupEditClose.addEventListener('click', closeProfilePopup);
popupFormEdit.addEventListener('submit', editNameAbout);

popupOpenButtonElement.addEventListener('click', openPopupElements);
popupCloseButtonElement.addEventListener('click', closePopupElements);
fullscreenCloseButton.addEventListener('click', closeFullscreen);
cardData.addEventListener('submit', editInfoElements);