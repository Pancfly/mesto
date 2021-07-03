/*объявление*/
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const popupEditOpen = profile.querySelector('.profile__button_action_edit');
const popupElementEdit = document.querySelector('.popup-edit');
const popupEditClose = popupElementEdit.querySelector('.popup__button_close-edit');
const popupFormEdit = popupElementEdit.querySelector('.popup__input');
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
  
function handleOpenAddCardPopup () {
    popupToggle(popupElements);
    cardTitle.value = '';
    cardImageSrc.value = '';
}
  
function editInfoElements (event) {
    event.preventDefault();
    const element = createCard({
      name: cardTitle.value,
      link: cardImageSrc.value,
    });
    popupToggle(popupElements);
    placementCard(element);
}

/* ф-и fullscreen*/
function openFullscreen (evt) {
    const element = evt.target.closest('.elements__image');
    fullscreenImage.src = element.src;
    fullscreenText.textContent = element.alt;
    popupToggle(popupFullscreen);
}

const popupToggle = function (popup) {
    popup.classList.toggle('popup_is-opened');
}

/*открытие*/
function handleOpenProfilePopup() {
    popupToggle(popupElementEdit);
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

/*редактирование с сохранением*/
function editNameAbout (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupToggle(popupElementEdit);
}

/*вызов*/
popupEditOpen.addEventListener('click', handleOpenProfilePopup);
popupEditClose.addEventListener('click', () => popupToggle(popupElementEdit));
popupFormEdit.addEventListener('submit', editNameAbout);

popupOpenButtonElement.addEventListener('click', handleOpenAddCardPopup);
popupCloseButtonElement.addEventListener('click', () => popupToggle(popupElements));
fullscreenCloseButton.addEventListener('click', () => popupToggle(popupFullscreen));
cardData.addEventListener('submit', editInfoElements);