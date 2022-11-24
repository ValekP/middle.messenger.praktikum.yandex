import SignUp from "./signUp"
import Auth from "../../layouts/Auth"
import AuthController from "../../controllers/AuthController";
import {router} from "../../index";

const SignupPage = {
    pathname: "/signup",
    view: Auth,
    props: {
        title: "Регистрация",
        content: new SignUp(),
        mountFn: () => {
            AuthController.checkAuth().catch(() => {
                router.go("/login")
            })
        }
    }
}

export default SignupPage
