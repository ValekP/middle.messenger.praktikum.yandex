import Auth from "../../components/Auth";
import Login from "./login";
import Button from "../../components/Button";

const LoginContent = new Login({
    inputLogin: '',
    inputPassword: '',
    button: new Button({
        title:"Войти"
    })
})

const LoginAuth = new Auth({
    title: "Вход",
    main: LoginContent,
})

export default LoginAuth
