import Popup from './popup';

export default class FormPopup extends Popup {
    constructor(popup, form, openButton, setSubmitButtonState, clearErrorMassege, funOpenForm, funSubmitForm) {
        super(popup);
        this.form = form;
        this.openButton = openButton;

        this.setSubmitButtonState = setSubmitButtonState;
        this.clearErrorMassege = clearErrorMassege;
        this.funOpenForm = funOpenForm;
        this.funSubmitForm = funSubmitForm;

        this.openForm = this.openForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    openForm() {
        this.funOpenForm();
    };

    submitForm(event) {
        this.funSubmitForm(event);
    };

    close() {
      if (this.form !== null) {
        this.form.reset();
      }
        super.close();
    }

    doOnOpenForm() {
        this.clearErrorMassege();
        this.setSubmitButtonState();
    }

    setListenersForm() {
      if (this.form !== null) {
        this.openButton.addEventListener("click", this.openForm);
        this.form.addEventListener("submit", this.submitForm);
      }
    }
}


