import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".modal__description").textContent = name;
    const image = this._popupElement.querySelector(".modal__image");
    image.src = link;
    image.alt = name;
  }
}
