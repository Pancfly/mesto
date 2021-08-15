export default class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._formSubmitButton = this._formElement.querySelector(this._submitButtonSelector);
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
    _hasInvalidInput() {
        return this._formInputs.some(inputElement => {
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
    _toggleSubmitButtonState() {
        if (this._hasInvalidInput()) {
            this._formSubmitButton.disabled = true;
            this._formSubmitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._formSubmitButton.disabled = false;
            this._formSubmitButton.classList.remove(this._inactiveButtonClass);
        }
    }

    /*убрать сообщения об ошибках и проверить кнопку*/
    setDefaultErrorState(){
        this._formInputs.forEach(inputElement => {
            this._hideInputError(inputElement)
            
        })
        this._toggleSubmitButtonState();
    }

    /*повесить слушатели*/
    _setEventListeners() {
        this._toggleSubmitButtonState(this._formSubmitButton, this._formInputs);
        this._formInputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleSubmitButtonState();
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