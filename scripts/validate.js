const validationSettings = {
    formSelector: '.popup__input',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button_submit',
    inactiveButtonClass: 'popup__button_submit-inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
}

function getErrorElement(formElement, inputElement) {
    return formElement.querySelector(`#${inputElement.id}-error`);
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = getErrorElement(formElement, inputElement);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError(formElement, inputElement) {
    const errorElement = getErrorElement(formElement, inputElement);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
}

function hasInvalidInput(formInputs) {
    return formInputs.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
    if (hasInvalidInput(formInputs)) {
        formSubmitButton.disabled = true;
        formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
    } else {
        formSubmitButton.disabled = false;
        formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
    }
}

function listenerEventInput(evt) {
    const formElement = evt.target.form;
    const inputElement = evt.srcElement;
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    checkInputValidity(formElement, inputElement);
    toggleSubmitButtonState(formInputs, formSubmitButton);
}

function openCheckValidity(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    formInputs.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement);
    });
    toggleSubmitButtonState(formInputs, formSubmitButton);
};

function setEventListeners(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleSubmitButtonState(formInputs, formSubmitButton);
    formInputs.forEach(inputElement => {
        inputElement.addEventListener('input', listenerEventInput);
    })
}

function enableValidation(settingsObject) {
    const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
    formsList.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })
        const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
        fieldsetList.forEach(fieldset => {
            setEventListeners(fieldset);
        })
    })
}

enableValidation(validationSettings);