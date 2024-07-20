import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputList = this._popupForm.querySelectorAll(".modal__input");
    this.submitButton = this._popupForm.querySelector(".modal__save-button");
  }

  _getInputValues() {
    const inputValues = {};
    this.inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
    super.setEventListeners();
  }

  setLoading(isLoading, text) {
    if (isLoading) {
      this.submitButton.textContent = "Saving...";
    } else {
      this.submitButton.textContent = text;
    }
  }
}
