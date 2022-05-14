export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameNode = document.querySelector(nameSelector);
    this._descNode = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameNode.textContent,
      desc: this._descNode.textContent
    }
  }

  setUserInfo(name, desc) {
    this._nameNode.textContent = name;
    this._descNode.textContent = desc;
  }
}
