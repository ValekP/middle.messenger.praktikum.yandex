import Auth from "../../layouts/Auth";
import Login from "./login";
import Button from "../../components/Button";
import Input from "../../components/Input";

const inputLogin = new Input({
    template: "auth",
    type: "text",
    name: "login",
    label: "Логин"
})

const inputPassword = new Input({
    template: "auth",
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

const loginContent = new Login({
    inputLogin,
    inputPassword,
    button
})

const LoginAuth = new Auth({
    title: "Вход",
    content: loginContent,
})

export default LoginAuth
