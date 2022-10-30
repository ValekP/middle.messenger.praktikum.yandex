import Page from "../../layouts/Page";
import ButtonBack from "../../components/ButtonBack";
import Profile from "../../layouts/Profile";
import UserProfile from "./userProfile";
import Input from "../../components/Input";
import Button from "../../components/Button";

const buttonBack = new ButtonBack()

const inputEmail = new Input({
    template: "profile",
    type: "email",
    name: "email",
    label: "Почта"
})

const inputLogin = new Input({
    template: "profile",
    type: "text",
    name: "login",
    label: "Логин"
})

const inputFirstName = new Input({
    template: "profile",
    type: "text",
    name: "first_name",
    label: "Имя"
})
const inputSecondName = new Input({
    template: "profile",
    type: "text",
    name: "second_name",
    label: "Фамилия"
})
const inputDisplayName = new Input({
    template: "profile",
    type: "text",
    name: "display_name",
    label: "Имя в чате"
})
const inputPhone = new Input({
    template: "profile",
    type: "text",
    name: "phone",
    label: "Телефон"
})

const button = new Button({
    title: "Сохранить",
    onClick: (e) => {
        inputEmail.inputValidate()
        inputLogin.inputValidate()
        inputFirstName.inputValidate()
        inputSecondName.inputValidate()
        inputDisplayName.inputValidate()
        inputPhone.inputValidate()
    }
})

const userProfile = new UserProfile({
    inputEmail,
    inputLogin,
    inputFirstName,
    inputSecondName,
    inputDisplayName,
    inputPhone,
    footer: button
})

const profile = new Profile({
    main: userProfile
})

const ProfilePage = new Page({
    sidebar: buttonBack,
    content: profile
})

export default ProfilePage
