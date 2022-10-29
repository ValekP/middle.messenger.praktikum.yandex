import Auth from "../../components/Auth";
import Login from "./login";
import Button from "../../components/Button";
import InputAuth from "../../components/InputAuth";

const inputLogin = new InputAuth({
    type: "text",
    name: "login",
    label: "Логин"
})

const inputPassword = new InputAuth({
    type: "password",
    name: "password",
    label: "Пароль"
})

const button = new Button({
    title: "Войти",
    onClick: (e) => {
        inputLogin.inputValidate()
        inputPassword.inputValidate()
    }
})

const LoginContent = new Login({
    inputLogin,
    inputPassword,
    button
})

const LoginAuth = new Auth({
    title: "Вход",
    main: LoginContent,
})

export default LoginAuth
