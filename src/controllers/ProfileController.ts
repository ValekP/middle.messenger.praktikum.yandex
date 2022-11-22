import {TProfile} from "../pages/UserProfile/userProfile"
import AuthController from "./AuthController"
import {errorRequest} from "../utils/errorRequest"
import {router} from "../index"
import ProfileAPI from "../services/Api/ProfileAPI"
import {TChangePassword} from "../pages/UserProfilePassword/userProfilePassword"

class ProfileController {
    public async updateProfile(data: TProfile) {
        try {
            await ProfileAPI.updateProfile(data)
            await AuthController.checkAuth()
            router.go('/profile')
        } catch (error) {
            errorRequest(error)
        }
    }

    public async updatePassword(data: TChangePassword) {
        try {
            await ProfileAPI.updatePassword(data)
            router.go('/profile')
        } catch (error) {
            errorRequest(error)
        }
    }

    public async updateAvatar(data: FormData) {
        try {
            await ProfileAPI.updateAvatar(data);
            await AuthController.checkAuth();
        } catch (error) {
            errorRequest(error);
        }
    }

}

export default new ProfileController()
