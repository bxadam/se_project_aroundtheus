import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import { config } from "../utils/constants.js";
/**
 * Elements
 */

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtextInput = document.querySelector("#profile-subtext-input");
const profileModalForm = document.querySelector("#profile-modal-form");

const addBtn = document.querySelector("#add-button");
const avatarEditBtn = document.querySelector("#avatar-edit-btn");

const newCardModalForm = document.querySelector("#new-card-modal-form");
const avatarModalForm = document.querySelector("#avatar-modal-form");

const cardListElement = document.querySelector(".cards__list");

/**
 * Variables
 */

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, newCardModalForm);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
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
  section = new Section(
    { items: items.reverse(), renderer: renderCard },
    cardListElement
  );
  section.renderItems();
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data.avatar);
});

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

const avatarModal = new PopupWithForm("#avatar-modal", handleAvatarModalSubmit);
avatarModal.setEventListeners();

const confirmModal = new PopupWithConfirmation("#confirm-modal");
confirmModal.setEventListeners();

const imageModal = new PopupWithImage("#preview-modal");
imageModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtext",
  avatarSelector: ".profile__picture",
});

/**
 * Event Handlers
 */

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

function handleLikeClick(card) {
  api
    .likeCard(card._id, card._isLiked)
    .then(() => {
      card.handleLikeClick();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleProfileModalSubmit(inputValues) {
  profileModal.setloading(true, "Saving...");
  api
    .setUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileModal.setloading(false, "Save");
    });

  userInfo.getUserInfo(inputValues.name, inputValues.about);
}

function handleNewCardModalSubmit(card) {
  cardModal.setloading(true, "Saving...");
  api
    .addCard({ name: card.title, link: card.link })
    .then(({ name, link }) => {
      renderCard({
        name,
        link,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardModal.setloading(false, "Create");
    });
  newCardModalForm.reset();
}

function handleDeleteClick(card) {
  confirmModal.open();
  confirmModal.setSubmitHandler(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.delete();
        confirmModal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function handleAvatarModalSubmit(url) {
  avatarModal.setloading(true, "Saving...");
  api
    .setAvatar(url)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarModal.setloading(false, "Save");
    });
  avatarModalForm.reset();
  avatarModal.close();
}

// Event Listeners

profileEditBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileSubtextInput.value = about;

  profileModal.open();
});

addBtn.addEventListener("click", () => {
  cardModal.open();
});

avatarEditBtn.addEventListener("click", () => {
  avatarModal.open();
});
