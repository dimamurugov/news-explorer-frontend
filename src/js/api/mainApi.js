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
        body: JSON.stringify({ email, password })
      }).then(res => {
        return this._checkResponseValidity(res);
      })
  }

  getUserArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    }).then(res => {
      return this._checkResponseValidity(res);
    })
  }
  createArticle({ keyword, title, text, date, source, link, image }) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        keyword, title, text, date, source, link, image
      })
    }).then(res => this._checkResponseValidity(res))
  }

  deleteArticleUser(idArticle) {
    return fetch(`${this.url}/articles/${idArticle}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then(res => {
      return this._checkResponseValidity(res);
    })
  }
  getUserMe() {
    return fetch(`${this.url}/users/me`,{
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    }).then(res => {
      return this._checkResponseValidity(res);
    })
  }

  //СОЗДАЙ ЗАПРОС КОТОРЫЙ ПРОВЕРЯЕТ ЕСЛИ КУКА В БРАУЗЕРЕ
  

  getIdArticle(link) {
    return this.getUserArticles()
    .then(res => {
      return res.data.find(item => {
        return item.link === link
      })
    })
  }

  _checkResponseValidity(res) {
    if (res.ok) {
        return res.json()
    }
    return res.json().then(Promise.reject.bind(Promise))
}
}