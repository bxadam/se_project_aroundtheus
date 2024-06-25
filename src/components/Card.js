export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._name = name;
    this._link = link;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
  }

  _setEventListeners() {
    //like button
    this._likeButton.addEventListener("click", this._handleLike);
    //delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);
    //image
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._cardElement.remove();
  };

  getView() {
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
