import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(evt) {
        super.open();
        const fullscreenImg = this._popup.querySelector('.popup__fullscreen-image');
        const fullscreenText = this._popup.querySelector('.popup__fullscreen-text');
        const imageToZoom = evt.target;
        fullscreenImg.src = imageToZoom.src;
        fullscreenImg.alt = imageToZoom.alt;
        fullscreenText.textContent = imageToZoom.alt;
    }
}