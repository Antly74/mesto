export default class UserInfo {
  constructor(profileNameSelector, profileDescSelector) {
    this._profileNameNode = document.querySelector(profileNameSelector);
    this._profileDescNode = document.querySelector(profileDescSelector);
  }

  getUserInfo() {
    return {
      profileName: this._profileNameNode.textContent,
      profileDesc: this._profileDescNode.textContent
    }
  }

  setUserInfo(profileName, profileDesc) {
    this._profileNameNode.textContent = profileName;
    this._profileDescNode.textContent = profileDesc;
  }
}
