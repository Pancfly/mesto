import {openPopup} from './index.js';
import {popupFullscreen, fullscreenImage, fullscreenText} from './consts.js'

export class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }

    _getCardTemplate() {
        const cardElement = this._cardSelector.content.cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._cardItem = this._getCardTemplate();
        this._setEventListeners();
        const elementTitle = this._cardItem.querySelector('.elements__title');
        const elementImage = this._cardItem.querySelector('.elements__image');
        elementTitle.textContent = this._name;
        elementImage.src = this._link;
        elementImage.alt = this._name;

        return this._cardItem;
    }

    _setEventListeners() {
        this._cardItem.querySelector('.elements__button_like').addEventListener('click', evt => {
            this._likeCard(evt);
        })
        this._cardItem.querySelector('.elements__button_delete').addEventListener('click', evt => {
            this._deleteCard(evt);
        })
        this._cardItem.querySelector('.elements__image').addEventListener('click', evt => {
            this._openFullscreenCard(evt);
        })
    }

    _likeCard(evt) {
        evt.target.classList.toggle('elements__button_like-active');
    }

    _deleteCard(evt) {
        const element = evt.target.closest('.elements__element')
        element.remove();
    }

    _openFullscreenCard(evt) {
        fullscreenImage.src = this._link;
        fullscreenImage.alt = this._name;
        fullscreenText.textContent = this._name;
        openPopup(popupFullscreen);
    }
}