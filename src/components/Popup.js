export default class Popup {
  constructor({ popupSelector }) {
    debugger;
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      const open = document.querySelector(".modal_opened");
      e.target.close(open);
    }
  };

  _handleOverlayClose = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      e.target.close();
    }
  };

  //make event handler for close button click and add to set event listeners

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
