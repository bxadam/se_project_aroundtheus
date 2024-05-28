//code
// function showInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorMessage.textContent = inputElement.validationMessage;
//   errorMessage.classList.add(errorClass);
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorMessage.textContent = "";
//   errorMessage.classList.remove(errorClass);
// }

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, options);
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// }

// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   let foundInvalid = false;
//   inputElements.forEach((inputElement) => {
//     if (!inputElement.validity.valid) {
//       foundInvalid = true;
//     }
//   });

//   if (foundInvalid) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function setEventListeners(formElement, options) {
//   const { inputSelector } = options;
//   const inputElements = [...formElement.querySelectorAll(inputSelector)];
//   const submitButton = formElement.querySelector(options.submitButtonSelector);
//   inputElements.forEach((inputElement) => {
//     inputElement.addEventListener("input", (e) => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputElements, submitButton, options);
//     });
//   });
//   toggleButtonState(inputElements, submitButton, options);
// }

// function enableValidation(options) {
//   const formElements = [...document.querySelectorAll(options.formSelector)];
//   formElements.forEach((formElement) => {
//     formElement.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });
//     setEventListeners(formElement, options);
//   });
// }

enableValidation(config);

// pseudo code
// make button inactive state based on checkvalidity when modal is opened
// close modal upon clicking into .modal__open div
// on modal open reset value of text content for new place inputs
