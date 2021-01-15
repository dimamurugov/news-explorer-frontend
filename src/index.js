import "./pages/index.css";
import "./images/favicon.ico";

import Popup from "./js/components/popup";
import Form from "./js/components/form";
import FormValidator from "./js/components/formValidator";
import { errorMessages } from "./js/constants/dataNameError";
import MainApi from "./js/api/mainApi";
import NewsApi from "./js/api/newsApi";
import Header from "./js/components/header";
import UserInfo from "./js/components/UserInfo";
import NewsCard from "./js/components/newsCard";
import NewsCardList from "./js/components/newsCardList";

//Константы
const { myServerConfig, newsApiConfig } = require("./js/constants/config");

const { formLogIn, formSignUp, popupLogIn,
  popupSignUp, popupDone, buttonLogIn,
  buttonLogOutUser, buttonLoginInForm, buttonSignUp,
  buttonLoginInMessageDone, logInAnswerMessage, signUpAnswerMessage,
  buttonSavePage, buutonSearch, formSearch, answerSearchMessage,
  preloaderLoading, preloaderNothing, container, sectionNews, showMoreButton
} = require("./js/constants/constants");

//Инстансы
const mainApi = new MainApi(myServerConfig);
const validatorLogIn = new FormValidator(formLogIn, errorMessages, logInAnswerMessage);
validatorLogIn.setEventListeners();
const logInFormInst = new Form(
  popupLogIn,
  formLogIn,
  buttonLogIn,
  _setSubmitButtonStateLoginForm,
  _clearErrorMassegeLoginForm,
  openLogInFormInst,
  submitLoginInFormInst
);

const validatorSignUp = new FormValidator(formSignUp, errorMessages, signUpAnswerMessage);
validatorSignUp.setEventListeners();
const signUpFormInst = new Form(
  popupSignUp,
  formSignUp,
  buttonSignUp,
  _setSubmitButtonStateSignUpForm,
  _clearErrorMassegeSignUp,
  openSignUpFormInst,
  submitSignUpFormInst
);

const messagePopup = new Popup(popupDone, );
const userInfoInst = new UserInfo();
const header = new Header({buttonSavePage: buttonSavePage, buttonUser: buttonLogOutUser, buttonLogIn: buttonLogIn });

const validatorSerachForm = new FormValidator(formSearch, errorMessages, answerSearchMessage);

const newsApiInst = new NewsApi(newsApiConfig);
const newsCartList = new NewsCardList(preloaderLoading, preloaderNothing, container, newsApiInst, createCard, sectionNews, showMoreButton);


//Функции
function submitSerachForm(event) {
  event.preventDefault();
  newsCartList.renderError(false);

  if (validatorSerachForm.checkInputSearch()) {
    validatorSerachForm.openAnswerMessage('Введите ключевое слово');
    return
  }
  validatorSerachForm.clearAnswerMessage();
  newsCartList.renderLoader(true);

  const keyWord = formSearch.elements.searchPlace.value;
  newsCartList.renderResults(keyWord);
}

function createCard(data) {
  const card = new NewsCard(data);
  return card.create()
}

function _setSubmitButtonStateLoginForm() {
  validatorLogIn.setSubmitButtonState(this.form.button, false);
}

function _setSubmitButtonStateSignUpForm() {
  validatorSignUp.setSubmitButtonState(this.form.button, false);
}

function openLogInFormInst() {
  this.doOnOpenForm();
  signUpFormInst.close();
  messagePopup.close();
  this.setListeners();
  this.open();
}

function openSignUpFormInst() {
  this.doOnOpenForm();
  logInFormInst.close();
  buttonLoginInForm.addEventListener("click", logInFormInst.openForm);
  this.setListeners();
  this.open();
}

function submitLoginInFormInst(event) {
  event.preventDefault();
  mainApi
    .signin(this.form.elements.email.value, this.form.elements.password.value)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify({
        email: res.email,
        name: res.name,
        id: res.id,
      }));
      header.render({ isLoggedIn: true, userName: res.name });
      this.close();

    })
    .catch((error) => {
      console.log(error);
      validatorLogIn.openAnswerMessage(error.message);
    });
}

function submitSignUpFormInst(event) {
  event.preventDefault();
  mainApi
    .signup(
      this.form.elements.name.value,
      this.form.elements.email.value,
      this.form.elements.password.value
    )
    .then((res) => {
      this.close();
      messagePopup.open();
    })
    .catch((error) => {
      console.log(error);
      validatorSignUp.openAnswerMessage(error.message);
    });
}

function submitSearchFormInst(event) {
  event.preventDefault();
}

function _clearErrorMassegeLoginForm() {
  validatorLogIn._clearErrorMassege();
}

function _clearErrorMassegeSignUp() {
  validatorSignUp._clearErrorMassege();
}

//функция проверки аворизирован ли пользователь
function isAuth() {
  const userName = userInfoInst.cheackLogIn().name;

  if (userInfoInst.cheackLogIn()) {
    console.log('Авторизирован');
    header.render({ isLoggedIn: true, userName: userName });
  }
}

function logOutUser() {
  userInfoInst.clearUserInfo();
  header.render({ isLoggedIn: false});
}

logInFormInst.setListenersForm();
signUpFormInst.setListenersForm();
messagePopup.setListeners();

buttonLoginInMessageDone.addEventListener("click", logInFormInst.openForm)
buttonLogOutUser.addEventListener("click", logOutUser);
buutonSearch.addEventListener("click", submitSerachForm)
isAuth();
