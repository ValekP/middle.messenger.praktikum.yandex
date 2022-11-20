import SignUp from "./signUp"
import Auth from "../../layouts/Auth"

const SignupPage = {
    pathname: "/signup",
    view: Auth,
    props: {
        title: "Регистрация",
        content: new SignUp(),
    }
}

export default SignupPage
