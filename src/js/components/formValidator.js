export default class FormValidator {
    constructor(form, errorMessages, answerMessage) {
      this.form = form;
      this.errorMessages = errorMessages;
      this.inputs = [...form.querySelectorAll('input')];
      // this.setEventListeners(); - можно и удалить
      this.answerMessage = answerMessage;
      this.isValidate = this.isValidate.bind(this);
    }

    //Метод показывает ошибку, если инпуты не проходят валидацию
    checkInputValidity(input, errorMessage) {
      this.isValidate(input);
      errorMessage.textContent = input.validationMessage;
    }

    //чтобы делать кнопку сабмита активной и неактивной
    setSubmitButtonState(button, state) {
      if (state) {
        button.removeAttribute('disabled');
        button.classList.add(`popup__button_state_actively`);
      } else {
        button.setAttribute('disabled', true);
        button.classList.remove(`popup__button_state_actively`);
      }
    }

    //Добавлять обработчики - (_validateForm)
    setEventListeners(){
        this.inputs.forEach(input => {
            input.addEventListener('input', (event) => {
              const errorMessage = input.parentNode.querySelector(`#error-${input.id}`);
              this.checkInputValidity(input, errorMessage);
              this.setSubmitButtonState(this.form.button, this.inputs.every(this.isValidate));// мы передаем в .every (что по правилу) функцию как колбэк - которая возвращает true\false
            });
        })
    }

    //Показать ошибку пришедшию с сервера (setServerError)
    openAnswerMessage(errorMessage) {
      this.answerMessage.classList.add(`popup__error-message_staty_actively`);
      this.answerMessage.textContent = errorMessage;
    }

    clearAnswerMessage(){
      this.answerMessage.classList.remove(`popup__error-message_staty_actively`);
    }

    //очищает поля формы ? (_clear)
    _clearErrorMassege() {
        this.inputs.forEach(input => {
            const errorMessage = input.parentNode.querySelector(`#error-${input.id}`);
            errorMessage.textContent = "";
        });
        this.answerMessage.classList.remove(`popup__error-message_staty_actively`);
    }

    checkInputSearch() {
      return this.inputs[0].value === ''
    }

    //валидирует полученый элемент (_validateInputElement)
    isValidate(input) {
        input.setCustomValidity("");
        //Проверка наличия символов
        if (input.validity.valueMissing) {
          console.log(input);
          input.setCustomValidity(this.errorMessages.empty);
          return false
        }
        //Проверка минимального кол-ва символов
        if (input.validity.tooShort || input.validity.tooLong) {
          input.setCustomValidity(this.errorMessages.wrongLength);
          return false
        }
        //Проверка введенна ли ссылка
        if (input.validity.typeMismatch && input.type === 'url') {
          input.setCustomValidity(this.errorMessages.wrongUrl);
          return false
        }
        //проверка на максимальное кол-во символов
        if (input.validity.rangeOverflow) {
          let max = input.getAttribute('max');
          input.setCustomValidity(this.errorMessages.wrongMaxLength);
          return false
        }
        return input.checkValidity();
    }
}