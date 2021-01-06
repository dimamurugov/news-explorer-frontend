import "./pages/index.css";
import "./images/favicon.ico";

import Popup from "./js/components/popup";
import FormPopup from "./js/components/formPopup";
import FormValidator from "./js/components/formValidator";
import { errorMessages } from "./js/constants/dataNameError";
import MainApi from "./js/api/mainApi";
import Header from "./js/components/header";
import UserInfo from "./js/components/UserInfo";

const { myServerConfig } = require("./js/constants/config");

const { formLogIn, formSignUp, popupLogIn,
  popupSignUp, popupDone, buttonLogIn,
  buttonLogOutUser, buttonLoginInForm, buttonSignUp,
  buttonLoginInMessageDone, logInAnswerMessage, signUpAnswerMessage,
  buttonSavePage } = require("./js/constants/constants");

const mainApi = new MainApi(myServerConfig);

const validatorLogIn = new FormValidator(formLogIn, errorMessages, logInAnswerMessage);
const logInFormInst = new FormPopup(
  popupLogIn,
  formLogIn,
  buttonLogIn,
  _setSubmitButtonStateLoginForm,
  _clearErrorMassegeLoginForm,
  openLogInFormInst,
  submitLoginInFormInst
);

const validatorSignUp = new FormValidator(formSignUp, errorMessages, signUpAnswerMessage);
const signUpFormInst = new FormPopup(
  popupSignUp,
  formSignUp,
  buttonSignUp,
  _setSubmitButtonStateSignUpForm,
  _clearErrorMassegeSignUp,
  openSignUpFormInst,
  submitSignUpFormInst
);

const messagePopup = new Popup(popupDone);
const userInfoInst = new UserInfo();
const header = new Header({buttonSavePage: buttonSavePage, buttonUser: buttonLogOutUser, buttonLogIn: buttonLogIn });

//Функции
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
      // console.log(JSON.parse(localStorage.getItem('user')));
      this.close();

    })
    .catch((error) => {
      console.log(error);
      validatorLogIn.openAnswerMessage();
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
      validatorSignUp.openAnswerMessage();
    });
}

function _clearErrorMassegeLoginForm() {
  validatorLogIn._clearErrorMassege();
}

function _clearErrorMassegeSignUp() {
  validatorSignUp._clearErrorMassege();
}

function isAuth() {
  console.log(userInfoInst.cheackLogIn());
  const userName = userInfoInst.cheackLogIn().name;
  
  if (userInfoInst.cheackLogIn()) {
    console.log('Авторизирован');
    header.render({ isLoggedIn: true, userName: userName });
  }
}

logInFormInst.setListenersForm();
signUpFormInst.setListenersForm();
messagePopup.setListeners();
buttonLoginInMessageDone.addEventListener("click", logInFormInst.openForm)

isAuth();

