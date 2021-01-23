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
  countArticles.textContent = massArticles.length;

  //сохраняем юзера теги
  const arrTags = massArticles.reduce((arrTags, article) => {
    let isTag = arrTags.find(tag => {
      return tag === article.keyword
    })
    if (isTag === undefined ) {
      arrTags.push(article.keyword);
    }
    return arrTags
  }, [])

  if (arrTags.length === 0) {
    keyWords.textContent = '0 статей';
    return
  }

  if (arrTags.length > 3) {
    const arrTwoTags = arrTags.slice(0,2);
    keyWords.textContent = arrTwoTags.join(', ') + ' и ';
    countKeyWords.textContent = `${arrTags.length - 2}-м другим`;
  } else {
    keyWords.textContent = arrTags.join(', ')
  }

}

function createCard(data) {
  const card = new NewsCard(data, undefined, mainApi, undefined);// второе значение для проверки авторизован ли пользователь
  return card.createArticleSavePage()
}

renderArticlesSavePage();
