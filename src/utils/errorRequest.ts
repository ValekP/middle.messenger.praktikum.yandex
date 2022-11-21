import {router} from "../index"
import Store from "../services/Store/Store"
import AuthController from "../controllers/AuthController"

export const errorRequest = (error: XMLHttpRequest | any) => {
    const {reason} = JSON.parse(error.response)

    switch (reason) {
        case "User already in system":
            AuthController.checkAuth().then(() => {
                router.go('/messenger')
                throw ("Авторизован")
            })
            break
        case "Cookie is not valid":
            Store.removeState()
            throw ("Не авторизован")
        default:
            throw new Error(reason)
    }
}
