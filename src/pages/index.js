import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import { initialCards, config } from "../utils/constants.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "03a6e48e-c1e2-40b5-8f26-406bbefbcb53",
    "Content-Type": "application/json",
  },
});

let section;
api.getInitialCards().then((items) => {
  section = new Section({ items, renderer: renderCard }, cardListElement);
  section.renderItems();
});

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

//adjust to make profile values patch the info in the server
function handleProfileModalSubmit(inputValues) {
  api.setUserInfo(inputValues).then((data) => {
    userInfo.setUserInfo(data);
  });
  userInfo.getUserInfo(inputValues.name, inputValues.about);
}

// adjust to make new card submission patch the cards array in server
function handleNewCardModalSubmit(inputValues) {
  renderCard({ name: inputValues.title, link: inputValues.link });
  newCardModalForm.reset();
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtext",
});

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileSubtextInput.value = job;

  profileModal.open();
});

addBtn.addEventListener("click", () => {
  cardModal.open();
});
