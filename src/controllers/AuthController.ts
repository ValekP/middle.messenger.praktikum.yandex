import AuthAPI from "../services/Api/AuthAPI"
import {router} from "../index"
import {TLogin} from "../pages/Login/login"
import Actions from "../services/Store/Actions"

class AuthController {
    public async login(user: TLogin) {
        try {
            await AuthAPI.login(user)
            await this.checkAuth()
            router.go('/messenger')
        } catch (error) {
            console.log(error)
        }
    }

    public async checkAuth() {
        try {
            const profile = await AuthAPI.checkAuth()
            console.log(profile)
            await Actions.setProfile(profile)
        } catch (error) {
            router.go('/login')
        }
    }

}

export default new AuthController()
