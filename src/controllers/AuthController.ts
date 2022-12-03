import AuthAPI from "../services/Api/AuthApi"
import {router} from "../index"
import {TLogin} from "../pages/Login/login"
import Actions from "../services/Store/Actions"
import Store from "../services/Store/Store"
import {ISignUp} from "../pages/SignUp/signUp"
import {errorRequest} from "../utils/errorRequest"
import {webpath} from "../webpath"

class AuthController {
    public async login(user: TLogin) {
        try {
            await AuthAPI.login(user)
            await this.checkAuth()
            router.go(webpath.chats)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async checkAuth() {
        try {
            const profile = await AuthAPI.checkAuth()
            await Actions.setProfile(profile)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async signUp(user: ISignUp) {
        try {
            await AuthAPI.signUp(user)
            await this.checkAuth()
            router.go(webpath.login)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async signOut() {
        try {
            await AuthAPI.signOut()
            Store.removeState()
        } catch (error) {
            errorRequest(error)
        }
    }

}

export default new AuthController()
