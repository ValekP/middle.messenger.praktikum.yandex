import Auth from "../../layouts/Auth";
import Signup from "./signup";
import Button from "../../components/Button";
import Input from "../../components/Input";

const inputEmail = new Input({
    template: "auth",
    type: "email",
    name: "email",
    label: "Почта"
})

const inputLogin = new Input({
    template: "auth",
    type: "text",
    name: "login",
    label: "Логин"
})

const inputFirstName = new Input({
    template: "auth",
    type: "text",
    name: "first_name",
    label: "Имя"
})
const inputSecondName = new Input({
    template: "auth",
    type: "text",
    name: "second_name",
    label: "Фамилия"
})
const inputPhone = new Input({
    template: "auth",
    type: "text",
    name: "phone",
    label: "Телефон"
})
const inputPassword = new Input({
    template: "auth",
    type: "password",
    name: "password",
    label: "Пароль"
})
const inputPasswordAgain = new Input({
    template: "auth",
    type: "password",
    name: "password_again",
    label: "Пароль (ещё раз)"
})
const button = new Button({
    title: "Зарегистрироваться",
    onClick: (e) => {
        inputEmail.inputValidate()
        inputLogin.inputValidate()
        inputFirstName.inputValidate()
        inputSecondName.inputValidate()
        inputPhone.inputValidate()
        inputPassword.inputValidate()
        inputPasswordAgain.inputValidate()
    }
})

const LoginContent = new Signup({
    inputEmail,
    inputLogin,
    inputFirstName,
    inputSecondName,
    inputPhone,
    inputPassword,
    inputPasswordAgain,
    button
})

const SignupAuth = new Auth({
    title: "Регистрация",
    content: LoginContent,
})

export default SignupAuth
