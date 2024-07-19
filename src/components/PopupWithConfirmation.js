import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._button = this._form.querySelector(".modal__save-button");
    this.submitButton = this._form.querySelector(".modal__save-button");
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  setLoading(isLoading, text) {
    if (isLoading) {
      this._button.textContent = "Saving...";
    } else {
      this._button.textContent = text;
    }
  }

  setDeleting(isLoading, text) {
    if (isLoading) {
      this._button.textContent = "Deleting...";
    } else {
      this._button.textContent = text;
    }
  }
}
