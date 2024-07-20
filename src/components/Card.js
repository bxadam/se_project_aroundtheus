export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  handleLikeClick = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  delete = () => {
    this._cardElement.remove();
  };

  getView() {
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitle.textContent = this._name;

    // if statement to check is liked and then add "card like button active"
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
