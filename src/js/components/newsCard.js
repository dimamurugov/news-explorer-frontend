import { convertDateCard } from '../utils/utils';

export default class NewsCard {
  constructor(data) {
    this.data = data;
  }
  create() {
    const template = document.createElement("div");

    template.insertAdjacentHTML('beforeend', `
    <div class="card">
      <div class="card__image card__image_theme_index-page" style="background-image:">
        <button class="card__button card__button_action_save"></button>
      </div>
      <div class="card__description">
        <p class="card__time">2 августа, 2019</p>
        <h3 class="card__title">Национальное достояние – парки</h3>
        <p class="card__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складыв...</p>
        <p class="card__author">Лента.ру</p>
      </div>
    </div>`);


    this.imageCard = template.querySelector(".card__image");
    this.dateCard = template.querySelector(".card__time");
    this.titleCard = template.querySelector(".card__title");
    this.textCard = template.querySelector(".card__text");
    this.authorCard = template.querySelector(".card__author");
    this.saveIcon = template.querySelector(".card__button");

    console.log(this.data.urlToImage);
    if (this.data.urlToImage !== null) {
      this.imageCard.style.backgroundImage = `url(${this.data.urlToImage})`;
    } else {
      this.imageCard.style.backgroundImage = `url(https://серебро.рф/img/placeholder.png)`;
    }
    this.dateCard.textContent = convertDateCard(this.data.publishedAt);
    this.titleCard.textContent = this.data.title;
    this.textCard.textContent = this.data.description;
    this.authorCard.textContent = this.data.source.name;


    this.placeCard = template.firstElementChild;
    return this.placeCard
  }
}