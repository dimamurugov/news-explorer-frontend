import "../pages/saveArticles.css";
import MainApi from "../js/api/mainApi";
import Popup from "../js/components/popup";
import Form from "../js/components/form";
import FormValidator from "../js/components/formValidator";
import { errorMessages } from "../js/constants/dataNameError";
import Header from "../js/components/header";
import UserInfo from "../js/components/UserInfo";

const { myServerConfig } = require("../js/constants/config");
const { formLogIn, formSignUp, popupLogIn,
  popupSignUp, popupDone, buttonLogIn,
  buttonLogOutUser, buttonLoginInForm, buttonSignUp,
  buttonLoginInMessageDone, logInAnswerMessage, signUpAnswerMessage,
  buttonSavePage } = require("../js/constants/constants");

const mainApi = new MainApi(myServerConfig);
const userInfoInst = new UserInfo();
const header = new Header({buttonSavePage: buttonSavePage, buttonUser: buttonLogOutUser, buttonLogIn: buttonLogIn });
header.render({ isLoggedIn: true, userName: JSON.parse(localStorage.getItem('user')).name });


