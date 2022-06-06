class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _checkResponse(res) {
        if(res.ok) {
            return res.json(); 
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo() {
        return fetch(this._url + '/users/me', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    getInitialCards() {
        return fetch(this._url + '/cards', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    setUserInfoApi(data) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }
    addUserCard(data) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }
    like(id) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    dislike(id) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
          })
          .then(this._checkResponse)
    }
    delete(id) {
        return fetch(this._url + `/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    handleAvatar(data) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    }
    getAllData() {
        return Promise.all([this.getInitialCards(),this.getUserInfo()])
    }
}
  const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
      authorization: 'a428200b-527d-46e6-b456-172268e0a0e6',
      'Content-Type': 'application/json'
    }
})
export default api