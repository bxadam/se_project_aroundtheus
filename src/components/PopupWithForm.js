import Popup from "./Popup.js";
export class PopupWithForms extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup_form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  open() {
    super.open();
  }

  _getInputValues() {
    //use user info to generate an object filled with info from UserInfo
  }
}
