import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
//import { initialCards } from '../utils/initialCards.js';
import { validationSettings, apiSetting, photoGallery, popupElementEdit, popupFormEdit, inputName,
        inputAbout, popupEditOpen, profileName, profileAbout, profileAvatar, popupElements, popupFormAdd,
        popupAddOpen, templateElements, popupFullscreen, popupDeleteCard, popupAvatar, popupAvatarOpen } from '../utils/constants.js';

let userId = null;

const validatorProfile = new FormValidator(validationSettings, popupFormEdit);
const validatorElements = new FormValidator(validationSettings, popupFormAdd);
const validatorAvatar = new FormValidator(validationSettings, popupAvatar);

/*вкючаем валидацию*/
validatorProfile.enableValidation();
validatorElements.enableValidation();
validatorAvatar.enableValidation();

const api = new Api(apiSetting);

api.getUserData()
    .then((res) => {
        userId = res._id;
        userInfo.setUserInfo(res);
        userInfo.setNewAvatar(res);
    })
    .catch((err) => {
        console.error(err);
    })

api.getInitialCards()
    .then((res) => {
        cardList.renderItems(res)
    })
    .catch((err) => {
        console.error(err);
    });

const popupDeleteElem = new PopupWithConfirmation(popupDeleteCard);

popupDeleteElem.setEventListeners();

/*создать карточку*/
function createCard (data) {
    const card = new Card({
        data: { ...data, userId },
        handleCardClick: () => {
            popupWithImage.open(data.name, data.link);
        },
        confirmationDelete: (id) => {
            popupDeleteElem.open();
            popupDeleteElem.setSubmitAction(() => {
                api.deleteCard(id)
                    .then(() => {
                        card.deleteCard();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
        }
    }, api, templateElements);

    return card.generateCard();
}

/*Создать экземпляра класса PopupWithImage*/
const popupWithImage = new PopupWithImage(popupFullscreen);

popupWithImage.setEventListeners();

/*Создать экземпляр класса Section для карточек*/
const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }
}, photoGallery);

/*Создать экземпляр класса UserInfo*/
const userInfo = new UserInfo({ userName: profileName, userAbout: profileAbout, userAvatar: profileAvatar });

/*Создать экземпляр класса PopupWithForm для Profile*/
const popupWithUserForm = new PopupWithForm(popupElementEdit, {
    handleFormSubmit: (userData) => {
        popupWithUserForm.renderLoading(false);
        api.patchUserData(userData)
            .then((res) => {
                userInfo.setUserInfo(res)
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupWithUserForm.renderLoading(true);
                popupWithUserForm.close();
            })
    }
});

popupWithUserForm.setEventListeners();

/*Создать экземпляр класса PopupWithForm для Elements*/
const popupWithPhotoForm = new PopupWithForm(popupElements, {
    handleFormSubmit: (photoData) => {
        popupWithPhotoForm.renderLoading(false);
        api.postCard(photoData)
            .then((res) => {
                cardList.addItem(createCard(res));
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupWithPhotoForm.renderLoading(true);
                popupWithPhotoForm.close();
            })
    }
});

popupWithPhotoForm.setEventListeners();

/*Создать экземпляр класса PopupWithForm для Avatar*/
const popupWithAvatarForm = new PopupWithForm(popupAvatar, {
    handleFormSubmit: (data) => {
        popupWithAvatarForm.renderLoading(false);
        api.patchUserAvatar(data)
            .then((res) => {
                userInfo.setNewAvatar(res);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupWithAvatarForm.renderLoading(true);
                popupWithAvatarForm.close();
            })
    }
});

popupWithAvatarForm.setEventListeners();

popupEditOpen.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().name;
    inputAbout.value = userInfo.getUserInfo().about;
    popupWithUserForm.open();
    validatorProfile.setDefaultErrorState();
    popupWithUserForm.renderLoading(false);
});

popupAddOpen.addEventListener('click', () => {
    validatorElements.setDefaultErrorState();
    popupWithPhotoForm.open();
    popupWithPhotoForm.renderLoading(false);
});

popupAvatarOpen.addEventListener('click', () => {
    validatorAvatar.setDefaultErrorState();
    popupWithAvatarForm.open();
    popupWithAvatarForm.renderLoading(false);
});