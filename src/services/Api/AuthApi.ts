import BaseAPI from './BaseApi'
import { TLogin } from '../../pages/Login/login'
import { ISignUp } from '../../pages/SignUp/signUp'

class AuthApi extends BaseAPI {
    constructor () {
        super({ path: '/auth' })
    }

    public login (data: TLogin) {
        return this.post('/signin',
            {
                data,
                withCredentials: true
            }
        )
    }

    public checkAuth () {
        return this.get('/user', {
            withCredentials: true
        })
    }

    public signUp (data: ISignUp) {
        return this.post('/signup',
            {
                data,
                withCredentials: true
            }
        )
    }

    public signOut () {
        return this.post('/logout', {
            withCredentials: true
        })
    }
}

export default new AuthApi()
