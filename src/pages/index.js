import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtextInput = document.querySelector("#profile-subtext-input");
const profileModalForm = document.querySelector("#profile-modal-form");
const profileTitle = document.querySelector("#profile-title");
const profileSubtext = document.querySelector("#profile-subtext");

const addBtn = document.querySelector("#add-button");

const newCardTitleInput = document.querySelector("#new-card-title-input");
const newCardLinkInput = document.querySelector("#new-card-link-input");
const newCardModalForm = document.querySelector("#new-card-modal-form");

const cardListElement = document.querySelector(".cards__list");

/**
 * Functions
 */

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

const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileModalSubmit
);
profileModal.setEventListeners();

const cardModal = new PopupWithForm(
  "#new-card-modal",
  handleNewCardModalSubmit
);
cardModal.setEventListeners();

const imageModal = new PopupWithImage("#preview-modal");
imageModal.setEventListeners();

/**
 * Event Handlers
 */

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

function handleProfileModalSubmit(inputValues) {
  profileTitle.textContent = inputValues.title;
  profileSubtext.textContent = inputValues.subtext;
}

function handleNewCardModalSubmit() {
  const name = newCardTitleInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link });
  newCardModalForm.reset();
}

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtextInput.value = profileSubtext.textContent;
  profileModal.open();
});

addBtn.addEventListener("click", () => {
  cardModal.open();
});
