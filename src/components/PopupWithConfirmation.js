import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { call }) {
        super(popupSelector);
        this._call = call;
        super.setEventListeners();
    }

    _deleteCard(evt) {
        evt.preventDefault();
        this._call(this._id, this._data);
    }

    close() {
        super.close();
        this._popup.removeEventListener('submit', this._deleteCard);
    }

    open(id, data) {
        super.open();
        this._popup.removeEventListener('submit', this._deleteCard);
        this._id = id;
        this._data = data;
    }
}