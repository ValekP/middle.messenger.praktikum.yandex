import BaseAPI from "./BaseApi"
import {TLogin} from "../../pages/Login/login"
import {ISignUp} from "../../pages/SignUp/signUp"

class AuthAPI extends BaseAPI {
    constructor() {
        super({path: '/auth'})
    }

    public login(data: TLogin) {
        return this.post('/signin',
            {
                data: data,
                withCredentials: true
            }
        )
    }

    public checkAuth() {
        return this.get('/user', {
            withCredentials: true
        })
    }

    public signUp(data: ISignUp) {
        return this.post('/signup',
            {
                data: data,
                withCredentials: true
            }
        )
    }

    public signOut() {
        return this.post('/logout', {
            withCredentials: true
        })
    }
}

export default new AuthAPI()
