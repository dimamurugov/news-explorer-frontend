export default class UserInfo {
  constructor() {

  }

  cheackLogIn() {
    const userStr = localStorage.getItem('user');
    const userData = userStr === '' ? '' : JSON.parse(userStr);
    return userData
  }

  clearUserInfo() {
    localStorage.setItem('user', '');
  }
}