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

const cardAddModal = document.querySelector("#add-card-modal");
const placeModalCloseBtn = document.querySelector("#place-close-btn");
const placeSaveBtn = document.querySelector("#place-save-btn");
const placeTitleInput = document.querySelector("#place-title-input");
const placeLinkInput = document.querySelector("#place-link-input");
const placeModalForm = document.querySelector("#place-modal-form");

const imageModal = document.querySelector("#image-modal");
const imageInput = document.querySelector(".modal__image");
const imageModalDescription = document.querySelector(".modal__description");
const imageClose = document.querySelector("#image-close");

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const closeBtn = imageModal.querySelector("#image-close");
/**
 * Functions
 */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  closeBtn.addEventListener("click", () => {
    closeModal(imageModal);
  });
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    imageInput.src = cardData.link;
    imageInput.alt = cardData.name;
    imageModalDescription.textContent = cardData.name;
    openModal(imageModal);

    console.log(imageModalDescription.textContent);
  });

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData) {
  const newCard = getCardElement(cardData);
  cardListElement.prepend(newCard);
}

initialCards.forEach((cardData) => renderCard(cardData, ""));

/**
 * Event Handlers
 */

function handleProfileModalSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtext.textContent = profileSubtextInput.value;
  closeModal(profileEditModal);
}

function handlePlaceModalSubmit(e) {
  e.preventDefault();
  const name = placeTitleInput.value;
  const link = placeLinkInput.value;
  renderCard({ name, link }, "");
  closeModal(cardAddModal);
  placeModalForm.reset();
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
  openModal(cardAddModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

placeModalCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

profileModalForm.addEventListener("submit", handleProfileModalSubmit);

cardAddModal.addEventListener("submit", handlePlaceModalSubmit);
