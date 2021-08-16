import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initialCards.js';
import { validationSettings, photoGallery, popupElementEdit, popupFormEdit, inputName,
        inputAbout, popupEditOpen, profileName, profileAbout, popupElements, popupFormAdd,
        popupAddOpen, templateElements, popupFullscreen } from '../utils/constants.js';

const validatorProfile = new FormValidator(validationSettings, popupFormEdit);
const validatorElements = new FormValidator(validationSettings, popupFormAdd);

/*вкючаем валидацию*/
validatorProfile.enableValidation();
validatorElements.enableValidation();

/*создать карточку*/
function createCard (element) {
    const card = new Card(element, {
        cardSelector: templateElements,
        handleCardClick: (evt) => {
            popupWithImage.open(evt);
        }
    });

    return card.generateCard();
}

/*Создать экземпляра класса PopupWithImage*/
const popupWithImage = new PopupWithImage(popupFullscreen);

popupWithImage.setEventListeners();

/*Создать экземпляр класса Section для карточек*/
const cardList = new Section({
    data: initialCards.reverse(),
    renderer: (item) => {
    cardList.addItem(createCard(item));
    }
}, photoGallery);

/*Отрисовать карточки*/
cardList.renderItems();

/*Создать экземпляр класса UserInfo*/
const userInfo = new UserInfo({ userName: profileName, userAbout: profileAbout });

/*Создать экземпляр класса PopupWithForm для popupEdit*/
const popupWithUserForm = new PopupWithForm(popupElementEdit, {
    handleFormSubmit: (userData) => {
        userInfo.setUserInfo(userData);
        popupWithUserForm.close();
    },
    setInputValues: () => {
        inputName.value = userInfo.getUserInfo().name;
        inputAbout.value = userInfo.getUserInfo().about;
    }
});

popupWithUserForm.setEventListeners();

/*Создать экземпляр класса PopupWithForm для popupAdd*/
const popupWithPhotoForm = new PopupWithForm(popupElements, {
    handleFormSubmit: (photoData) => {
        cardList.addItem(createCard(photoData));
        popupWithPhotoForm.close();
    },
    setInputValues: () => {
        /*Можно пойти по пути меньшего сопротивления и оставить эту ф-ю пока пустой?*/
    }
});

popupWithPhotoForm.setEventListeners();

popupEditOpen.addEventListener('click', () => {
    popupWithUserForm.open();
    validatorProfile.setDefaultErrorState();
});

popupAddOpen.addEventListener('click', () => {
    validatorElements.setDefaultErrorState();
    popupWithPhotoForm.open();
});