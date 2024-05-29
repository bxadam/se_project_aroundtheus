class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorMessage = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this._errorClass);
  }
  // fix show/hide input error methods
  _hideInputError(formElement, inputElement) {
    const errorMessage = formElement.querySelector(`#${inputElement}-error`);
    formElement.classList.remove(this._errorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputElements) {
    let foundInvalid = false;
    this._inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });
    // chnaged submit button state to this ref
    if (foundInvalid) {
      this._submitButton.classList.add(".inactiveButtonClass");
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(".inactiveButtonClass");
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
    // this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
