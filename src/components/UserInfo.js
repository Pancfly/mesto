export default class UserInfo {
    constructor({ userName, userAbout }) {
        this._userName = userName;
        this._userAbout = userAbout;
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
    }
}