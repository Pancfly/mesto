import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleDeleteCard) {
        super(popupSelector);
        this._handleDeleteCard = handleDeleteCard;
        this._formElement = this._popup.querySelector('.popup__input');
        this._deleteCard = this._deleteCard.bind(this);
    }

    _deleteCard(evt) {
        evt.preventDefault();
        this._handleDeleteCard(this._id, this._element);
    }

    open(id, element) {
        super.open();
        this._id = id;
        this._element = element;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._deleteCard);
    }
}