import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfilePhoto from "../../components/Profile/Photo"
import {connectProfile} from "../../services/Store/ConnectComponents"
import validateInputsList from "../../helpers/validateInputsList"
import ProfileController from "../../controllers/ProfileController"

export type TChangePassword = {
    oldPassword: string
    newPassword: string
}

const inputFields: Indexed = {
    oldPassword: new Input({
        template: "profile",
        type: "password",
        name: "password_old",
        label: "Старый Пароль"
    }),
    newPassword: new Input({
        template: "profile",
        type: "password",
        name: "password",
        label: "Новый пароль"
    })
}

const inputFieldsExtend: Indexed = {
    ...inputFields,
    againPassword: new Input({
        template: "profile",
        type: "password",
        name: "password_again",
        label: "Повторите новый пароль"
    })
}

const button = new Button({
    title: "Сохранить",
    onClick: async (e: Event) => {
        e.preventDefault()

        const inputs = validateInputsList(inputFields)
        const inputsExtend = validateInputsList(inputFieldsExtend)
        if (inputs && inputsExtend) {
            await ProfileController.updatePassword(inputs as TChangePassword)
        }

    }
})

const userPhoto = new ProfilePhoto()

class UserProfilePassword extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "profile"
                },
                userPhoto,
                ...inputFieldsExtend,
                footer: button
            }
        )
    }

    render() {
        return this.compile(`
            {{{ userPhoto }}}
            <div class="profile__fields-list">
                {{{ oldPassword }}}
                {{{ newPassword }}}
                {{{ againPassword }}}
            </div>
            <div class="profile__footer">
                {{{ footer }}}
            </div>
        `)
    }
}

export default connectProfile(UserProfilePassword)
