import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfilePhoto from "../../components/Profile/Photo"

const inputPasswordOld = new Input({
    template: "profile",
    type: "password",
    name: "password_old",
    label: "Старый Пароль"
})

const inputPassword = new Input({
    template: "profile",
    type: "password",
    name: "password",
    label: "Новый пароль"
})

const inputPasswordAgain = new Input({
    template: "profile",
    type: "password",
    name: "password_again",
    label: "Повторите новый пароль"
})

const button = new Button({
    title: "Сохранить",
    onClick: () => {
        inputPasswordOld.inputValidate()
        inputPassword.inputValidate()
        inputPasswordAgain.inputValidate()
    }
})

const userPhoto = new ProfilePhoto()

export class UserProfilePassword extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "profile"
                },
                userPhoto,
                inputPasswordOld,
                inputPassword,
                inputPasswordAgain,
                footer: button,
            }
        )
    }

    render() {
        return this.compile(`
            {{{ userPhoto }}}
            <div class="profile__fields-list">
                {{{ inputPasswordOld }}}
                {{{ inputPassword }}}
                {{{ inputPasswordAgain }}}
            </div>
            <div class="profile__footer">
                {{{ footer }}}
            </div>
        `)
    }
}
