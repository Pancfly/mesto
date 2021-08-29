import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__input');
        this._formInputs = this._formElement.querySelectorAll('.popup__text');
        this._saveButton = this._popup.querySelector('.popup__button_submit');
    }

    open() {
        super.open();
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

    renderLoading(load) {
        if (load) {
          this._saveButton.textContent = 'Сохранение...';
        } else {
          this._saveButton.textContent = 'Сохранить';
        }
      }

    close() {
        super.close();
        this._formElement.reset();
    }
}