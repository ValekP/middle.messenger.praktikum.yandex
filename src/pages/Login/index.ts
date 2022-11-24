import Login from "./login"
import Auth from "../../layouts/Auth"
import AuthController from "../../controllers/AuthController";
import {router} from "../../index";

const LoginPage = {
    pathname: "/login",
    view: Auth,
    isAuthRedirect: "/messenger",
    props: {
        title: "Вход",
        content: new Login(),
        mountFn: () => AuthController.checkAuth().then(() => {
            router.go('/messenger')
        })
    }
}

export default LoginPage
