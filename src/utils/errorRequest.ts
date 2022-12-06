import {router} from "../index"
import Store from "../services/Store/Store"
import AuthController from "../controllers/AuthController"
import {webpath} from "../webpath"

export const errorRequest = (error: XMLHttpRequest | any) => {
    try {
        const {reason} = JSON.parse(error.response)

        switch (reason) {
            case "User already in system":
                AuthController.checkAuth().then(() => {
                    router.go(webpath.chats)
                    throw ("Авторизован")
                })
                break
            case "Cookie is not valid":
                Store.removeState()
                throw ("Не авторизован")
            default:
                alert(reason)
                throw new Error(reason)
        }
    } catch (e: any) {
        throw new Error(e)
    }
}
