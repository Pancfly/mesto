import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullscreenImg = this._popup.querySelector('.popup__fullscreen-image');
        this._fullscreenText = this._popup.querySelector('.popup__fullscreen-text');
    }

    open(data) {
        super.open();   
        this._fullscreenImg.src = data.link;
        this._fullscreenImg.alt = data.name;
        this._fullscreenText.textContent = data.name;
    }
}