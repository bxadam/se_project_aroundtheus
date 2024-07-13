export default class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards",
      {
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async getUserInfo() {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me",
      {
        headers: this._headers,
      }
    );
    this._checkResponse(res);
  }

  async setUserInfo(data) {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }
    );
    this._checkResponse(res);
  }
  async setAvatar(url) {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: url,
      }
    );
    return this._checkResponse(res);
  }

  async addCard() {
    const addedCard = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards",
      {
        method: "POST",
        headers: this._headers,
      }
    );
    return this._checkResponse(addedCard);
  }

  async deleteCard() {
    const deletedCard = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/:cardId",
      {
        method: "DELETE",
        headers: this._headers,
      }
    );
    return this._checkResponse(deletedCard);
  }

  async likeCard() {
    const likeCard = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/:cardId/likes",
      {
        method: "PUT",
        headers: this._headers,
      }
    );
    return this._checkResponse(likeCard);
  }

  async dislikeCard() {
    const dislikeCard = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/:cardId/likes",
      {
        method: "DELETE",
        headers: this._headers,
      }
    );
    return this._checkResponse(dislikeCard);
  }
}
