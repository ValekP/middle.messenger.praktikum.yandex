import Login from "./login"
import Auth from "../../layouts/Auth"
import AuthController from "../../controllers/AuthController"
import {router} from "../../index"
import {webpath} from "../../webpath";

const LoginPage = {
    pathname: "/login",
    view: Auth,
    props: {
        title: "Вход",
        content: new Login(),
        mountFn: () => AuthController.checkAuth().then(() => {
            router.go(webpath.chats)
        })
    }
}

export default LoginPage
