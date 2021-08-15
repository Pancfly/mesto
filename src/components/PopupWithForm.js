import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit, setInputValues }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._setInputValues = setInputValues;
        this._formElement = this._popup.querySelector('.popup__input');
        this._formInputs = this._formElement.querySelectorAll('.popup__text');
    }

    open() {
        super.open();
        this._setInputValues();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', evt =>{
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });      
    }

    _getInputValues() {
        this._formValues = {};
        this._formInputs.forEach(inputElement => this._formValues[inputElement.name] = inputElement.value);

        return this._formValues;
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}