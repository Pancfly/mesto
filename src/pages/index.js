import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
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

/*Создать экземпляра класса Api*/
const api = new Api(apiSetting);

/*Методы класса Api для получения данных*/
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

/*Создать экземпляра класса PopupWithConfirmation*/
const popupDeleteElem = new PopupWithConfirmation(popupDeleteCard, (id, card) => {
    api.deleteCard(id)
        .then(() => {
            card.deleteCard();
            popupDeleteElem.close();
        })
        .catch((err) => {
            console.error(err);
        })
});

popupDeleteElem.setEventListeners();

/*создать карточку*/
function createCard (cardItem, userId) {
    const card = new Card(cardItem, userId, templateElements, {
        handleCardClick: () => {
            popupWithImage.open(cardItem)
        },
        handleCardDelete: () => {
            popupDeleteElem.open(cardItem._id, card)
        },
        handleCardLike: () => {
            api.putLike(cardItem._id)
                .then((res) => {
                    card.setLikeCount(res.likes.length);
                    card.handleLikeActive();
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        handleCardUnlike: () => {
            api.deleteLike(cardItem._id)
                .then((res) => {
                    if (res.likes.length === 0) {
                        card.setLikeCount('');
                    } else {
                        card.setLikeCount(res.likes.length)
                    };
                    card.handleLikeActive();
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    });

    return card.generateCard();
}

/*Создать экземпляр класса PopupWithImage*/
const popupWithImage = new PopupWithImage(popupFullscreen);

popupWithImage.setEventListeners();

/*Создать экземпляр класса Section для карточек*/
const cardList = new Section({
    renderer: (cardItem, userId) => {
        cardList.addItem(createCard(cardItem, userId));
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
                userInfo.setUserInfo(res);
                popupWithUserForm.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupWithUserForm.renderLoading(true);
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
                cardList.addItem(createCard(res, res.owner._id));
                popupWithPhotoForm.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupWithPhotoForm.renderLoading(true);
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
                popupWithAvatarForm.close();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                popupWithAvatarForm.renderLoading(true);
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