export const validationSettings = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button_submit',
    inactiveButtonClass: 'popup__button_submit-inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
}

export const content = document.querySelector('.content');
export const photoGallery = document.querySelector('.elements__list');
export const popupElementEdit = document.querySelector('.popup-edit');
export const popupFormEdit = popupElementEdit.querySelector('.popup__input_type_profile-form');
export const inputName = popupFormEdit.querySelector('#profile-name');
export const inputAbout = popupFormEdit.querySelector('#profile-about');
export const popupEditOpen = content.querySelector('.profile__button_action_edit');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');
export const popupElements = document.querySelector('.popup-add');
export const popupFormAdd = popupElements.querySelector('.popup__input_type_elements-form');
export const popupAddOpen = content.querySelector('.profile__button_action_add');
export const templateElements = document.querySelector('.template-elements');
export const popupFullscreen = document.querySelector('.popup_type_fullscreen');