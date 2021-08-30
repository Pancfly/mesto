export default class Card {
    constructor(data, userId, cardSelector, { handleCardClick, handleCardDelete, handleCardLike, handleCardUnlike }) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._userId = userId;
        this._likesArray = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._handleCardUnlike = handleCardUnlike;
    }

    _getCardTemplate() {
        const cardElement = this._cardSelector.content.cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._cardItem = this._getCardTemplate();
        this._elementImage = this._cardItem.querySelector('.elements__image');
        this._elementLike = this._cardItem.querySelector('.elements__button_like');
        this._elementLikeActive = this._cardItem.querySelector('.elements__button_like-active');
        this._elementLikeCount = this._cardItem.querySelector('.elements__count');
        this._elementTitle = this._cardItem.querySelector('.elements__title');
        this._elementDelButton = this._cardItem.querySelector('.elements__button_delete');

        this._elementTitle.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._hasMyLike = this._likesArray.some(item => item._id === this._userId);
        if (this._hasMyLike) {
            this._elementLike.classList.add('elements__button_like-active');
        };
        if (this._likesArray.length === 0) {
            this.setLikeCount('')
        } else { 
            this.setLikeCount(this._likesArray.length)
        }
        if (!(this._userId === this._ownerId)) {
            this._elementDelButton.remove();
        };
        this._setEventListeners();

        return this._cardItem;
    }

    setLikeCount(likeCount) {
        this._elementLikeCount.textContent = likeCount;
    }

    _setEventListeners() {
        if (this._userId === this._ownerId) {
            this._elementDelButton.addEventListener('click', this._handleCardDelete);
        };
        this._elementLike.addEventListener('click', () => this._handleLikeCard());
        this._elementImage.addEventListener('click', this._handleCardClick);
    }

    _handleLikeCard() {
        if (this._elementLike.classList.contains('elements__button_like-active')) {
            this._handleCardUnlike()
        } else {
            this._handleCardLike()
        };
    }

    handleLikeActive() {
        this._elementLike.classList.toggle('elements__button_like-active');
    }

    deleteCard() {
        this._cardItem.remove();
    }
}