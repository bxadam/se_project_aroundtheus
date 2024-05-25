export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._name = name;
    this._link = link;
  }

  _setEventListeners() {
    //like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike);
    //delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);
    //image
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._cardElement.remove();
    console.log("delete");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardElement.querySelector(".card__");
    // set event listeners
    this._setEventListeners();
    // return the completed card
    return this._cardElement;
  }
}
