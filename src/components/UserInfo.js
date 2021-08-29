export default class UserInfo {
    constructor({ userName, userAbout, userAvatar }) {
        this._userName = userName;
        this._userAbout = userAbout;
        this._userAvatar = userAvatar;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }

    setNewAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}