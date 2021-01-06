export default class Header {
  constructor(options) {
    this.buttonSavePage = options.buttonSavePage;
    this.buttonUser = options.buttonUser;
    this.buttonLogIn = options.buttonLogIn;
  }

  render(props) {
    if (props.isLoggedIn) {
      this.buttonSavePage.classList.add(`header__signin_state_action`);//добавили ссылку на "Сохранённые статьи"
      this.buttonLogIn.classList.remove(`header__signin_state_action`);//удалили кнопку "Авторизация"
      this.buttonUser.classList.add(`header__signin_state_action`);//Добавили кнопку "Юзера"
      this.buttonUser.textContent = props.userName;
      return
    }

    this.buttonSavePage.classList.remove(`header__signin_state_action`);//удалили ссылку на "Сохраненнйые статьи"
    this.buttonLogIn.classList.add(`header__signin_state_action`);//добавили кнопку "Авторизации"
    this.buttonUser.classList.remove(`header__signin_state_action`);//удалили кнопку "Юзера"
  }
}
