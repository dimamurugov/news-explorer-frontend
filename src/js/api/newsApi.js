import { getQuery } from "../utils/utils";

export default class NewsApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  getArticles(keyWord) {
    console.log('Я начал искать');
    const query = getQuery(keyWord);
    return fetch(`${this._url}${query}`)
      .then((res) => {
        return this._requestHandler(res)
      })
  }
  _addKeyWordCard() {

  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(Promise.reject.bind(Promise))
  }
}