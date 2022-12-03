import {TProfile} from "../pages/UserProfile/userProfile"
import AuthController from "./AuthController"
import {errorRequest} from "../utils/errorRequest"
import {router} from "../index"
import ProfileAPI from "../services/Api/ProfileApi"
import ProfileApi from "../services/Api/ProfileApi"
import {TChangePassword} from "../pages/UserProfilePassword/userProfilePassword"
import Actions from "../services/Store/Actions"
import {webpath} from "../webpath"
import ChatController from "./ChatController"
import {TChatApiAddUser, TFindUser} from "../services/Api/ChatApi"

class ProfileController {
    public async updateProfile(data: TProfile) {
        try {
            await ProfileAPI.updateProfile(data)
            await AuthController.checkAuth()
        } catch (error) {
            errorRequest(error)
        }
    }

    public async updatePassword(data: TChangePassword) {
        try {
            await ProfileAPI.updatePassword(data)
            router.go(webpath.profile)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async updateAvatar(data: FormData) {
        try {
            await ProfileAPI.updateAvatar(data)
            await AuthController.checkAuth()
        } catch (error) {
            errorRequest(error)
        }
    }

    public updateProfileProps(inputFields: Indexed) {
        const state = Actions.getProfileState() as Indexed
        for (const [key] of Object.entries(inputFields)) {
            const props = {...inputFields[key]._props, value: state[key]}
            inputFields[key].setProps(props)
        }
    }

    public updateProfilePhoto(userPhoto: Indexed) {
        const state = Actions.getProfileState() as Indexed
        userPhoto.setProps({
            ...userPhoto._props,
            photo: state.avatar ? `https://ya-praktikum.tech/api/v2/resources${state.avatar}` : null
        })
    }

    public async findUser(data: TFindUser) {
        try {
            const userProfile = await ProfileApi.findUser(data)
            const chatId = Actions.getActiveChat().id
            if (Array.isArray(userProfile) && chatId) {
                if (userProfile.length < 1) {
                    alert('Пользователь не найден')
                }
                const userId = userProfile[0].id
                const data: TChatApiAddUser = {
                    "users": [
                        userId
                    ],
                    "chatId": chatId
                }
                await ChatController.addUserChat(data)
            }
        } catch (error) {
            errorRequest(error)
        }
    }
}

export default new ProfileController()
