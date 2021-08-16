import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullscreenImg = this._popup.querySelector('.popup__fullscreen-image');
        this._fullscreenText = this._popup.querySelector('.popup__fullscreen-text');
    }

    open(evt) {
        super.open();   
        const imageToZoom = evt.target;
        this._fullscreenImg.src = imageToZoom.src;
        this._fullscreenImg.alt = imageToZoom.alt;
        this._fullscreenText.textContent = imageToZoom.alt;
    }
}