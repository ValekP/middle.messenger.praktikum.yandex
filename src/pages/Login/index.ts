import Login from "./login"
import Auth from "../../layouts/Auth"
import {router} from "../../index"

const LoginPage = {
    pathname: "/login",
    view: Auth,
    isAuthRedirect: "/messenger",
    props: {
        title: "Вход",
        content: new Login(),
    },
    isAuthFn: () => {
        console.log("auth loginp")
        router.go("/messenger")
    },
    isNotAuthFn: () => {
        console.log('not auth loginp')
    }
}

export default LoginPage
