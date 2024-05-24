import Card from "../components/card.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
const card = new Card(cardData, "#card-template");
card.getCard();

/**
 * Elements
 */

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = document.querySelector("#modal-close-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtextInput = document.querySelector("#profile-subtext-input");
const profileModalForm = document.querySelector("#modal-form");
const profileTitle = document.querySelector("#profile-title");
const profileSubtext = document.querySelector("#profile-subtext");

const addBtn = document.querySelector("#add-button");
const closeButtons = document.querySelectorAll(".modal__close");

const newCardModal = document.querySelector("#new-card-modal");
const newCardModalCloseBtn = document.querySelector("#new-card-close-btn");
const newCardSaveBtn = document.querySelector("#new-card-save-btn");
const newCardTitleInput = document.querySelector("#new-card-title-input");
const newCardLinkInput = document.querySelector("#new-card-link-input");
const newCardModalForm = document.querySelector("#new-card-modal-form");

const previewModal = document.querySelector("#preview-modal");
const previewInput = document.querySelector("#preview-zoom");
const previewModalDescription = document.querySelector(".modal__description");
const previewCloseBtn = previewModal.querySelector("#preview-close-button");

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/**
 * Functions
 */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscape);
  document.removeEventListener("click", handleOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscape);
  document.addEventListener("click", handleOverlay);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const open = document.querySelector(".modal_opened");
    closeModal(open);
  }
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function getCardElement(cardData) {
  // const cardElement = cardTemplate.cloneNode(true);
  // const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  // const likeBtn = cardElement.querySelector(".card__like-button");
  // const deleteBtn = cardElement.querySelector(".card__delete-button");

  // likeBtn.addEventListener("click", () => {
  //   likeBtn.classList.toggle("card__like-button_active");
  // });

  // deleteBtn.addEventListener("click", () => {
  //   cardElement.remove();
  // });

  cardImageElement.addEventListener("click", () => {
    previewInput.src = cardData.link;
    previewInput.alt = cardData.name;
    previewModalDescription.textContent = cardData.name;
    openModal(previewModal);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData) {
  const newCard = getCardElement(cardData);
  cardListElement.prepend(newCard);
  //   const card = new Card(cardData, "#card-template");
  // card.getCard();
}

initialCards.forEach((cardData) => renderCard(cardData));

/**
 * Event Handlers
 */

function handleProfileModalSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtext.textContent = profileSubtextInput.value;
  closeModal(profileEditModal);
}

function handleNewCardModalSubmit(e) {
  e.preventDefault();
  const name = newCardTitleInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link });
  closeModal(newCardModal);
  newCardModalForm.reset();
}

function handleOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

/**
 * Event Listeners
 */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtextInput.value = profileSubtext.textContent;
  openModal(profileEditModal);
});

addBtn.addEventListener("click", () => {
  openModal(newCardModal);
});

profileModalForm.addEventListener("submit", handleProfileModalSubmit);

newCardModalForm.addEventListener("submit", handleNewCardModalSubmit);
