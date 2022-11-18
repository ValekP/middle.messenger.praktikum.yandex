import {Login} from "./login"
import Auth from "../../layouts/Auth"

const LoginPage = {
    pathname: "/login",
    view: Auth,
    props: {
        title: "Вход",
        content: new Login(),
    }
}

export default LoginPage
