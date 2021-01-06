export default class Popup {
    constructor(popup) {
        this.popup = popup;
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    open() {
      this.popup.classList.add('popup_is-opened');
    }
    close() {
      this.popup.classList.remove('popup_is-opened');
    }
    setListeners() {
      this.popup.querySelector('.popup__close').addEventListener("click", this.close);
    }
}
