export default class UserInfo {
  constructor({ profileNameSelector, profileDescSelector, profileAvatarSelector }) {
    this._profileNameNode = document.querySelector(profileNameSelector);
    this._profileDescNode = document.querySelector(profileDescSelector);
    this._profileAvatarNode = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      profileName: this._profileNameNode.textContent,
      profileDesc: this._profileDescNode.textContent
    }
  }

  setUserInfo(info) {
    this._profileNameNode.textContent = info.name;
    this._profileDescNode.textContent = info.about;
    this._me = info._id;
    this._profileAvatarNode.src = info.avatar;
  }

  getMe() {
    return this._me;
  }
}
