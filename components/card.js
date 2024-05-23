export default class Card {
  constructor({ name, link }, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
  }

  _setEventListeners() {
    //like button
    //delete button
    console.log("yay");
  }

  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true);
    // get card
    // set event listeners
    this._setEventListeners();
    // return the completed card
  }
}
