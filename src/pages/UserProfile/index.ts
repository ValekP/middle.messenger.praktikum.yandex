import Page from "../../layouts/Page";
import BackSidebar from "../../components/BackSidebar";
import Profile from "../../layouts/Profile";
import UserProfile from "./userProfile";
import InputProfile from "../../components/InputProfile";
import Button from "../../components/Button";

const backSidebar = new BackSidebar()

const inputEmail = new InputProfile({
    type: "email",
    name: "email",
    label: "Почта"
})

const inputLogin = new InputProfile({
    type: "text",
    name: "login",
    label: "Логин"
})

const inputFirstName = new InputProfile({
    type: "text",
    name: "first_name",
    label: "Имя"
})
const inputSecondName = new InputProfile({
    type: "text",
    name: "second_name",
    label: "Фамилия"
})
const inputDisplayName = new InputProfile({
    type: "text",
    name: "display_name",
    label: "Имя в чате"
})
const inputPhone = new InputProfile({
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
    sidebar: backSidebar,
    content: profile
})

export default ProfilePage