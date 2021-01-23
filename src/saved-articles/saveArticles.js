import "../pages/saveArticles.css";
import MainApi from "../js/api/mainApi";
import Header from "../js/components/header";
import UserInfo from "../js/components/UserInfo";
import NewsCard from "../js/components/newsCard";
import NewsCartList from "../js/components/newsCardList";

const { myServerConfig } = require("../js/constants/config");
const { formLogIn, formSignUp, popupLogIn,
  popupSignUp, popupDone, buttonLogIn,
  buttonLogOutUser, buttonLoginInForm, buttonSignUp,
  buttonLoginInMessageDone, logInAnswerMessage, signUpAnswerMessage,
  buttonSavePage, userName, countArticles, keyWords, countKeyWords
  ,container, mobileMenu, buttonCloseMenu, buttonBurger } = require("../js/constants/constants");

const mainApi = new MainApi(myServerConfig);
const userInfoInst = new UserInfo();
const newsCardList = new NewsCartList(undefined, undefined, container, mainApi, createCard, container, undefined);
const header = new Header({buttonSavePage: buttonSavePage, buttonUser: buttonLogOutUser, buttonLogIn: buttonLogIn, mobileMenu: mobileMenu, buttonBurger: buttonBurger, buttonCloseMenu: buttonCloseMenu });
header.render({ isLoggedIn: true, userName: JSON.parse(localStorage.getItem('user')).name });

function logOutUserSavePage() {
  userInfoInst.clearUserInfo();
  location.href = './index.html';
}

buttonLogOutUser.addEventListener("click", logOutUserSavePage);

function renderArticlesSavePage() {
  mainApi.getUserArticles()
  .then(res => {
    console.log(res);
    renderProfile(res.data);
    newsCardList.renderArticlesSavePage(res.data);
  })

}

function renderProfile(massArticles) {
  userName.textContent = userInfoInst.getUserData().name;
  countArticles.textContent = massArticles.length + 1;
  //сохраняем юзера теги
  const arrTag = massArticles.reduce((arrTags, article) => {
    let isTag = arrTags.find(tag => {
      return tag === article.keyword
    })
    if (isTag === undefined ) {
      arrTags.push(article.keyword);
    }
    return arrTags
  }, [])

  const arrTwoTags = arrTag.slice(0,2);
  keyWords.textContent = arrTwoTags.join(', ')
  countKeyWords.textContent = arrTag.length - 2;
}

function createCard(data) {
  const card = new NewsCard(data, undefined, mainApi, undefined);// второе значение для проверки авторизован ли пользователь
  return card.createArticleSavePage()
}

renderArticlesSavePage();
