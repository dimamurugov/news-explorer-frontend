export default class UserInfo {
  constructor() {

  }

  getUserData() {
    const userStr = localStorage.getItem('user');
    const userData = userStr === '' ? '' : JSON.parse(userStr);
    return userData
  }

  clearUserInfo() {
    localStorage.setItem('user', '');
  }
}