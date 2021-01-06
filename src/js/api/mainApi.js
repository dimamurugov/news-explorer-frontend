export default class MainApi {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  signup(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    }).then(res => {
      return this._checkResponseValidity(res);
    })
  }

  signin(email, password) {
      return fetch(`${this.url}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: this.headers,
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(res => {
        return this._checkResponseValidity(res);
      })
  }

  getArticle() {
    return fetch(`${this.url}/articles`,{
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    }).then(res => {
      return this._checkResponseValidity(res);
    })
  }

  _checkResponseValidity(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
}