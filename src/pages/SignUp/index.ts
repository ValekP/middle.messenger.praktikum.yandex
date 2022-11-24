import SignUp from "./signUp"
import Auth from "../../layouts/Auth"
import AuthController from "../../controllers/AuthController"
import {router} from "../../index"
import {webpath} from "../../webpath";

const SignupPage = {
    pathname: "/signup",
    view: Auth,
    props: {
        title: "Регистрация",
        content: new SignUp(),
        mountFn: () => AuthController.checkAuth().then(() => {
            router.go(webpath.chats)
        })
    }
}

export default SignupPage
