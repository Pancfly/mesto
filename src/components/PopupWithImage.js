import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullscreenImg = this._popup.querySelector('.popup__fullscreen-image');
        this._fullscreenText = this._popup.querySelector('.popup__fullscreen-text');
    }

    open(name, link) {
        super.open();   
        this._fullscreenImg.src = link;
        this._fullscreenImg.alt = name;
        this._fullscreenText.textContent = name;
    }
}