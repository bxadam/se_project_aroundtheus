export default class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
    this._avatar = data.avatar;
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
    return this._checkResponse(res);
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
    return this._checkResponse(res);
  }
  async setAvatar(url) {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: url.link }),
      }
    );
    return this._checkResponse(res);
  }

  async addCard({ name, link }) {
    const addedCard = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/",
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      }
    );
    return this._checkResponse(addedCard);
  }

  async deleteCard(id) {
    console.log("=======");
    console.log(id);
    const deletedCard = await fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    );
    return this._checkResponse(deletedCard);
  }

  async likeCard(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    const likeCard = await fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}/likes`,
      {
        method: method,
        headers: this._headers,
      }
    );
    return this._checkResponse(likeCard);
  }
}
