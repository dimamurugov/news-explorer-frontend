import { convertDateCard } from '../utils/utils';

export default class NewsCard {
  constructor(data, isAuth, api, _getMyID) {
    this.data = data;
    this.isAuth = isAuth;
    this.api = api;
    // this._getMyID = _getMyID;

    this.saveArticle = this.saveArticle.bind(this);
    this.deleteCardSavePage = this.deleteCardSavePage.bind(this);
    // this._renderIconSave = this._renderIconSave.bind(this);
  }
  templateCard() {
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
    <div class="card">
      <div class="card__image card__image_theme_index-page" style="background-image:">
        <button class="card__button"></button>
      </div>
      <div class="card__description">
        <p class="card__time">2 августа, 2019</p>
        <h3 class="card__title">Национальное достояние – парки</h3>
        <p class="card__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складыв...</p>
        <p class="card__author">Лента.ру</p>
      </div>
    </div>`);

    return template
  }

  //создания карточки для Главной статьи
  create() {
    const template = this.templateCard();

    this.imageCard = template.querySelector(".card__image");
    this.dateCard = template.querySelector(".card__time");
    this.titleCard = template.querySelector(".card__title");
    this.textCard = template.querySelector(".card__text");
    this.authorCard = template.querySelector(".card__author");
    this.saveIcon = template.querySelector(".card__button");

    let imageUrl;
    if (this.data.urlToImage === undefined ) {
      imageUrl = `url(../../images/placeholder.png)`;
    } else {
      imageUrl = `url(${this.data.urlToImage})`;
    }
    this.imageCard.style.backgroundImage = imageUrl;

    this.dateCard.textContent = convertDateCard(this.data.publishedAt);
    this.titleCard.textContent = this.data.title;
    this.textCard.textContent = this.data.description;
    this.authorCard.textContent = this.data.source.name;

    this._renderIconSave();
    this.placeCard = template.firstElementChild;
    return this.placeCard
  }

  createArticleSavePage() {
    const template = this.templateCard();

    this.imageCard = template.querySelector(".card__image");
    this.dateCard = template.querySelector(".card__time");
    this.titleCard = template.querySelector(".card__title");
    this.textCard = template.querySelector(".card__text");
    this.authorCard = template.querySelector(".card__author");
    this.saveIcon = template.querySelector(".card__button");
    this.imageCard.insertAdjacentHTML('afterbegin', `<div><p class="card__teg">Природа</p></div>`);
    this.imageCard.classList.remove('card__image_theme_index-page');
    this.tag = template.querySelector(".card__teg");

    let imageUrl;
    if (this.data.image === undefined ) {
      imageUrl = `url(https://серебро.рф/img/placeholder.png)`;
    } else {
      imageUrl = `url(${this.data.image})`;
    }
    this.imageCard.style.backgroundImage = imageUrl;

    this.tag.textContent = this.data.keyword;
    this.dateCard.textContent = this.data.date;
    this.titleCard.textContent = this.data.title;
    this.textCard.textContent = this.data.text;
    this.authorCard.textContent = this.data.source;

    this.saveIcon.classList.add(`card__button_action_delete`);
    this.setListenersSavePage();
    this.placeCard = template.firstElementChild;
    return this.placeCard
  }
  delete() {
    console.log(this);
    this.api.deleteArticleUser(this.data._id)
      .then(res => {
        console.log(res)
    });
  }

  deleteCardSavePage(event) {
    const selectArticle = this.placeCard.closest('.card');
    event.stopPropagation();
    selectArticle.remove();
    this.delete();
    location.reload();

    this.removeListernesSavePage();
  }
  //Логика сохранение\удаления статьи
  saveArticle() {
    if (this.saveIcon.classList.contains('card__button_action_click')) {
      this.saveIcon.classList.remove('card__button_action_click');

      this.delete();
    } else {
      this.saveIcon.classList.add('card__button_action_click');

      const articleData = {
        keyword: this.data.keyword,
        title: this.data.title,
        text: this.data.description,
        date: this.dateCard.textContent,
        source: this.data.source.name,
        link: this.data.url,
        image: this.data.urlToImage,
      };

      this.api.createArticle(articleData)
      .then(res => {
        console.log('Удалил: ' + res)
        this.removeListernes();
      })
    }
  }

  //сделать кнопку save активной
  setIconSaveState(button, state) {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add(`card__button_action_save`);
      this.saveIcon.classList.remove('card__button_save');
  } else {
      button.setAttribute('disabled', true);
      button.classList.remove(`card__button_action_save`);
      this.saveIcon.classList.add('card__button_save');
  }
  }

  //функция отвечаета за отриссовку кнопки iconSave
  _renderIconSave() {
    if (this.isAuth) {
      this.setIconSaveState(this.saveIcon, true)
      this.setListeners();

      //проверка, лайкал ли пользователь эту карточку
      this._isCheakArticles(this.data.url)
      .then(res => {
        if (res) {
          this.saveIcon.classList.add('card__button_action_click');
          this.data._id = res._id;//сохранили id карточки в классе карточки(пригодится для удаления)
        }
      })

    } else {
      this.setIconSaveState(this.saveIcon, false)
    }
  }
  //функция проверка существует ли такая карточка
  _isCheakArticles(linkArticles) {
    return this.api.getUserArticles()
    .then(res => {
      return res.data.find(item => {
         return item.link === linkArticles
      })
    })
  }

  setListeners() {
    this.saveIcon.addEventListener("click", this.saveArticle);
  }
  setListenersSavePage() {
    this.saveIcon.addEventListener("click", this.deleteCardSavePage);
  }

  removeListernes() {
    this.saveIcon.removeEventListener("click", this.saveArticle);
  }
  removeListernesSavePage() {
    this.saveIcon.removeEventListener("click", this.deleteCardSavePage);
  }
}