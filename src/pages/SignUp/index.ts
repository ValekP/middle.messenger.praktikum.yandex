import SignUp from "./signUp"
import Auth from "../../layouts/Auth"
import {checkAuth} from "../../controllers/AuthActions"

const SignupPage = {
    pathname: "/signup",
    view: Auth,
    props: {
        title: "Регистрация",
        content: new SignUp(),
        mountFn: checkAuth
    }
}

export default SignupPage
