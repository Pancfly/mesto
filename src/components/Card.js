export default class Card {
    constructor({ data, handleCardClick, confirmationDelete }, api, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._userID = data.userId;
        this._api = api;
        this._likesArray = data.likes.length;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._confirmationDelete = confirmationDelete;
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
        this._elementLikeCount.textContent = this._likesArray;
        this._elementTitle.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;

        this._checkOwnerID();
        this._checkLike(this._checkLikeOwner());

        this._setEventListeners();
        return this._cardItem;
    }

    _putActiveLike() {
        this._elementLike.classList.add('elements__button_like-active');
    }

    _deleteActiveLike() {
        this._elementLike.classList.remove('elements__button_like-active');
    }

    _checkOwnerID() {
        if (this._ownerId !== this._userID) {
            this._elementDelButton.remove();
        }
    }

    _likeCard() {
        this._api.putLike(this._id)
            .then((res) => {
                this._elementLikeCount.textContent = res.likes.length;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    _deleteLikeCard() {
        this._api.deleteLike(this._id)
            .then((res) => {
                this._elementLikeCount.textContent = res.likes.length;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    _checkLikeOwner() {
        return Boolean(this._likes.find((obj => obj._id == this._userID)));
    }

    _checkLike(like) {
        if (like) {
            this._putActiveLike();
        }
    }

    _deleteCard() {
        this._confirmationDelete(this._id, this._cardItem);
    }

    _setEventListeners() {
        this._elementDelButton.addEventListener('click', () => {
            this._deleteCard();
        })

        this._elementLike.addEventListener('click', () => {
            if (this._elementLike.classList.contains('elements__button_like-active')) {
                this._deleteActiveLike();
                this._deleteLikeCard();
            } else {
                this._putActiveLike();
                this._likeCard();
            }
        })

        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }
}