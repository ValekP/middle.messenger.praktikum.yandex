import Auth from "../../components/Auth";
import Signup from "./signup";
import Button from "../../components/Button";
import InputAuth from "../../components/InputAuth";

const inputEmail = new InputAuth({
    type: "email",
    name: "email",
    label: "Почта"
})

const inputLogin = new InputAuth({
    type: "text",
    name: "login",
    label: "Логин"
})

const inputFirstName = new InputAuth({
    type: "text",
    name: "first_name",
    label: "Имя"
})
const inputSecondName = new InputAuth({
    type: "text",
    name: "second_name",
    label: "Фамилия"
})
const inputPhone = new InputAuth({
    type: "text",
    name: "phone",
    label: "Телефон"
})
const inputPassword = new InputAuth({
    type: "password",
    name: "password",
    label: "Пароль"
})
const inputPasswordAgain = new InputAuth({
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
    main: LoginContent,
})

export default SignupAuth
