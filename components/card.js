export default class Card {
  constructor({ name, link }, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
  }

  _setEventListeners() {
    //like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike());
    //delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete());
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

  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get card
    // set event listeners
    this._setEventListeners();
    // return the completed card
  }
}
