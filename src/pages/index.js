import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

/**
 * Elements
 */

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtextInput = document.querySelector("#profile-subtext-input");
const profileModalForm = document.querySelector("#profile-modal-form");
const profileTitle = document.querySelector("#profile-title");
const profileSubtext = document.querySelector("#profile-subtext");

const addBtn = document.querySelector("#add-button");
const closeButtons = document.querySelectorAll(".modal__close");

const newCardModal = document.querySelector("#new-card-modal");
const newCardTitleInput = document.querySelector("#new-card-title-input");
const newCardLinkInput = document.querySelector("#new-card-link-input");
const newCardModalForm = document.querySelector("#new-card-modal-form");

const previewModal = document.querySelector("#preview-modal");
const previewInput = document.querySelector("#preview-zoom");
const previewModalDescription = document.querySelector(".modal__description");

const cardListElement = document.querySelector(".cards__list");

/**
 * Functions
 */

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keyup", handleEscClose);
//   document.removeEventListener("click", handleOverlayClose);
// } //moved to Popup

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keyup", handleEscClose);
//   document.addEventListener("click", handleOverlayClose);
// } //moved to Popup

// function createCard(cardData) {
//   const cardElement = new Card(cardData, "#card-template", handleImageClick);
//   return cardElement.getView();
// } // Moved to section (do i have to import Card.js to Section to use getView?)

// function renderCard(cardData) {
//   const card = createCard(cardData);
//   cardListElement.prepend(card);
// } //moved to section

// initialCards.forEach((cardData) => renderCard(cardData));

// Section Functionality

const renderCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  section.addItem(cardElement);
};

const section = new Section(
  { items: initialCards, renderer: renderCard },
  cardListElement
);
section.renderItems();

// Validation Functionality

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, newCardModalForm);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// const profileModal = new PopupWithForms({
//   popupSelector: "#profile-edit-modal",
//   handleFormSubmit: (data) => {},
// });

// const cardModal = new PopupWithForms({
//   popupSelector: "#new-card-modal",
//   handleFormSubmit: (data) => {},
// });

const imageModal = new PopupWithImage("#preview-modal");
imageModal.setEventListeners();
/**
 * Event Handlers
 */

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

function handleProfileModalSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtext.textContent = profileSubtextInput.value;
  profileModalForm.close();
}

function handleNewCardModalSubmit(e) {
  e.preventDefault();
  const name = newCardTitleInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link });
  closeModal(newCardModal);
  newCardModalForm.reset();
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const open = document.querySelector(".modal_opened");
    closeModal(open);
  }
} //moved to Popup

function handleOverlayClose(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
} //moved to Popup

/**
 * Event Listeners
 */

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });

// closeButtons.forEach((button) => {
//   button.setEventListeners();
// }); //wtf

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtextInput.value = profileSubtext.textContent;
  openModal(profileEditModal);
});

addBtn.addEventListener("click", () => {
  openModal(newCardModal);
});

// profileModalForm.addEventListener("submit", handleProfileModalSubmit);
// profileModalForm.setEventListeners();

// newCardModalForm.addEventListener("submit", handleNewCardModalSubmit);
// newCardModalForm.setEventListeners();

// previewModal.setEventListeners();
