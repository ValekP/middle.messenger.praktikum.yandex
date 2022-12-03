import BaseAPI from "./BaseApi"
import {TProfile} from "../../pages/UserProfile/userProfile"
import {TChangePassword} from "../../pages/UserProfilePassword/userProfilePassword"
import {TFindUser} from "./ChatApi"

class UserProfileAPI extends BaseAPI {
    constructor() {
        super({path: "/user"})
    }

    public updateProfile(data: TProfile) {
        return this.put("/profile", {
            data: data,
            withCredentials: true
        })
    }

    public updatePassword(data: TChangePassword) {
        return this.put("/password", {
            data: data,
            withCredentials: true
        })
    }

    public updateAvatar(data: FormData) {
        return this.put("/profile/avatar", {
            headers: {},
            withCredentials: true,
            data,
        })
    }

    public findUser(data: TFindUser) {
        return this.post('/search', {
            withCredentials: true,
            data,
        })
    }
}

export default new UserProfileAPI()
