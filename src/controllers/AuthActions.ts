import {router} from "../index"
import AuthController from "./AuthController"

export const checkNotAuth = async () => {
    await AuthController.checkAuth().catch(() => {
        router.go("/login")
    })
}

export const checkAuth = async () => {
    await AuthController.checkAuth().then(() => {
        router.go('/messenger')
    })
}


