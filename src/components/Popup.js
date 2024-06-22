export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement.document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.document.addEventListener(
      "click",
      this._handleOverlayClose
    );
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.document.removeEventListener(
      "keyup",
      this._handleEscClose
    );
    this._popupElement.document.removeEventListener(
      "click",
      this._handleOverlayClose
    );
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

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
