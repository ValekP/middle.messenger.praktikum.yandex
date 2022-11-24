import {TProfile} from "../pages/UserProfile/userProfile"
import AuthController from "./AuthController"
import {errorRequest} from "../utils/errorRequest"
import {router} from "../index"
import ProfileAPI from "../services/Api/ProfileAPI"
import {TChangePassword} from "../pages/UserProfilePassword/userProfilePassword"
import Actions from "../services/Store/Actions";

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

    public updateProfileProps(inputFields: Indexed, userPhoto: Indexed) {
        const state = Actions.getProfileState() as Indexed
        for (const [key] of Object.entries(inputFields)) {
            const props = {...inputFields[key]._props, value: state[key]}
            inputFields[key].setProps(props)
        }
        this.updateProfilePhoto(userPhoto)
    }

    public updateProfilePhoto(userPhoto: Indexed) {
        const state = Actions.getProfileState() as Indexed
        userPhoto.setProps({
            ...userPhoto._props,
            photo: state.avatar ? `https://ya-praktikum.tech/api/v2/resources${state.avatar}` : null
        })
    }
}

export default new ProfileController()
