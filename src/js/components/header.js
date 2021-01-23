export default class Header {
  constructor(options) {
    this.buttonSavePage = options.buttonSavePage;
    this.buttonUser = options.buttonUser;
    this.buttonLogIn = options.buttonLogIn;
    this.buttonBurger = options.buttonBurger;
    this.mobileMenu = options.mobileMenu;
    this.buttonCloseMenu = options.buttonCloseMenu

    this.openMobileMenu = this.openMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.setListeners();
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
  openMobileMenu() {
    this.mobileMenu.classList.add('menu_action_open');
  }
  closeMobileMenu() {
    this.mobileMenu.classList.remove('menu_action_open');
  }

  setListeners() {
    this.buttonBurger.addEventListener("click", this.openMobileMenu);
    this.buttonCloseMenu.addEventListener("click", this.closeMobileMenu);
  }
  
}
