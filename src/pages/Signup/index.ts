import {Signup} from "./signup"
import Auth from "../../layouts/Auth"

const SignupPage = {
    pathname: "/signup",
    view: Auth,
    props: {
        title: "Регистрация",
        content: new Signup(),
    }
}

export default SignupPage
