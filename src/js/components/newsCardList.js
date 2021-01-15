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
    this.setListenersList();
  }
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
  renderResults(keyWord) {
    this.container.innerHTML = '';
    this.api.getArticles(keyWord)
    .then(res => {
      this.sectionNews.classList.add(`news-content_theme_active`);
      if (res.totalResults === 0) {
        throw new Error()
      }
      console.log(res);
      this.arrResult = res.articles;
      this.countArticles = res.totalResults;
      this.saveIndexCard = 0;

      this.showMore();
      this.renderLoader(false);
    })
    .catch(() => {
      this.renderError(true);
    })
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