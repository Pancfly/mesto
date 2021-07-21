export class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    /*определить элемент с текстом ошибки*/
    _getErrorElement(inputElement) {
        return this._formElement.querySelector(`#${inputElement.id}-error`);
    }

    /*показать ошибку*/
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._getErrorElement(inputElement);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    /*скрыть ошибку*/
    _hideInputError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    /*невалидное поле*/
    _hasInvalidInput(formInputs) {
        return formInputs.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    /*проверить валидность поля*/
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    /*установить и переключить состояние кнопки*/
    _toggleSubmitButtonState(buttonElement, formInputs) {
        if (this._hasInvalidInput(formInputs)) {
            buttonElement.disabled = true;
            buttonElement.classList.add('popup__button_submit-inactive');
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove('popup__button_submit-inactive');
        }
    }

    /*повесить слушатели*/
    _setEventListeners() {
        const formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const formSubmitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleSubmitButtonState(formSubmitButton, formInputs);
        formInputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitButtonState(formSubmitButton, formInputs);
            });
        });
    }

    /*объявить ф-ю валидации*/
    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}