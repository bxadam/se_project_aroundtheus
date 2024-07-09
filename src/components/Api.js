export default class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }
  _checkResponse() {
    fetch(this._url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  async _sendRequest(url, data) {
    const res = await fetch(url, data);
    if (this._checkResponse) {
      return res.json();
    }
    console.log(data);
  }

  async getInitialCards() {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards",
      {
        headers: {
          authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        },
      }
    );
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async getUserInfo() {}
  setUserInfo(data) {}
  setAvatar(data) {}
  addCard(data) {}
  deleteCard(data) {}
  likeCard(data) {}
  dislikeCard(data) {}
}
