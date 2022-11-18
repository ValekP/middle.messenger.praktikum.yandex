import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfilePhoto from "../../components/Profile/Photo"

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
    onClick: () => {
        inputEmail.inputValidate()
        inputLogin.inputValidate()
        inputFirstName.inputValidate()
        inputSecondName.inputValidate()
        inputDisplayName.inputValidate()
        inputPhone.inputValidate()
    }
})

const userPhoto = new ProfilePhoto()

export class UserProfileEdit extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "profile"
                },
                userPhoto,
                inputEmail,
                inputLogin,
                inputFirstName,
                inputSecondName,
                inputDisplayName,
                inputPhone,
                footer: button,
            }
        )
    }

    render() {
        return this.compile(`
            {{{ userPhoto }}}
            <div class="profile__fields-list">
                {{{ inputEmail }}}
                {{{ inputLogin }}}
                {{{ inputFirstName }}}
                {{{ inputSecondName }}}
                {{{ inputDisplayName }}}
                {{{ inputPhone }}}
            </div>
            <div class="profile__footer">
                {{{ footer }}}
            </div>
        `)
    }
}
