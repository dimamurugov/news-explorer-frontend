export default class NewsCartList {
  constructor(preloaderLoading, error, container, api, createCard, sectionNews, showMoreButton) {
    this.preloaderLoading = preloaderLoading;
    this.error = error;
    this.container = container;
    this.api = api;
    this.sectionNews = sectionNews;
    this.showMoreButton = showMoreButton;

    this.createCard = createCard;
    this.showMore = this.showMore.bind(this);
  }

  //отобразить 3 статьи
  showMore() {
    for (let i = 0; i < 3; i++) {
      if (this.saveIndexCard === this.countArticles) {
        this.showMoreButton.classList.add(`news-content__button-uncover_theme_disable`);
        break
      }

      this.addCard(this.createCard(this.arrResult[this.saveIndexCard]));
      this.saveIndexCard++;
    }
  }

  //рендер который идёт после запроса
  renderResults(keyword) {
    this.container.innerHTML = '';

    this.api.getArticles(keyword)
    .then(res => {

      if (res.totalResults === 0) {
        throw new Error()
      }
      this.showMoreButton.classList.remove(`news-content__button-uncover_theme_disable`);
      this.sectionNews.classList.add(`news-content_theme_active`);
      //Добавляю в статью, её тему
      this.arrResult = res.articles.map(item => {
        item.keyword = keyword;
        return item
      })

      this.countArticles = res.totalResults;
      this.saveIndexCard = 0;

      this.showMore();
    })
    .catch(() => {
      this.renderError(true);
    })
    .finally(() => {
      this.renderLoader(false);
    })
  }
  //рендер статей пользователя
  renderArticlesSavePage(arrayArticles) {
    this.container.innerHTML = '';

    arrayArticles.forEach(article => {
      this.addCard(this.createCard(article));
    });
  }

  addCard(element) {
    this.container.appendChild(element);
  }

  renderLoader(state) {
    if (state) {
      this.preloaderLoading.classList.add(`preloader_theme_active`);
      return
    }
    this.preloaderLoading.classList.remove(`preloader_theme_active`);
  }
  renderError(state) {
    if (state) {
      this.error.classList.add(`preloader_theme_active`);
      return
    }
    this.error.classList.remove(`preloader_theme_active`);
  }
  setListenersList() {
    this.showMoreButton.addEventListener("click", this.showMore);
  }
}