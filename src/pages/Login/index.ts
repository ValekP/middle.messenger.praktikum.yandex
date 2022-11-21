import Login from "./login"
import Auth from "../../layouts/Auth"
import {checkAuth} from "../../controllers/AuthActions"

const LoginPage = {
    pathname: "/login",
    view: Auth,
    isAuthRedirect: "/messenger",
    props: {
        title: "Вход",
        content: new Login(),
        mountFn: checkAuth
    }
}

export default LoginPage
