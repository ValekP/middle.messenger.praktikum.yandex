import Auth from "../../components/Auth";
import Login from "./login";
import Button from "../../components/Button";
import InputAuth from "../../components/InputAuth";

const LoginContent = new Login({
    inputLogin: new InputAuth({
        type: "text",
        name: "login",
        label: "Логин"
    }),
    inputPassword: new InputAuth({
        type: "password",
        name: "password",
        label: "Пароль"
    }),
    button: new Button({
        title:"Войти"
    })
})

const LoginAuth = new Auth({
    title: "Вход",
    main: LoginContent,
})

export default LoginAuth
