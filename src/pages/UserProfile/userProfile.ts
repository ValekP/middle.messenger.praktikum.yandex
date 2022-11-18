import Block from "../../services/Block"
import Input from "../../components/Input"
import ProfilePhoto from "../../components/Profile/Photo"
import Link from "../../components/Link"

const inputEmail = new Input({
    template: "profile",
    staticTmpl: true,
    value: "teset@test.er",
    type: "email",
    name: "email",
    label: "Почта"
})

const inputLogin = new Input({
    template: "profile",
    staticTmpl: true,
    type: "text",
    name: "login",
    label: "Логин"
})

const inputFirstName = new Input({
    template: "profile",
    staticTmpl: true,
    type: "text",
    name: "first_name",
    label: "Имя"
})
const inputSecondName = new Input({
    template: "profile",
    staticTmpl: true,
    type: "text",
    name: "second_name",
    label: "Фамилия"
})
const inputDisplayName = new Input({
    template: "profile",
    staticTmpl: true,
    type: "text",
    name: "display_name",
    label: "Имя в чате"
})
const inputPhone = new Input({
    template: "profile",
    staticTmpl: true,
    type: "text",
    name: "phone",
    label: "Телефон"
})

const userPhoto = new ProfilePhoto()

export class UserProfile extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "profile"
                },
                userPhoto,
                userName: "SuperAdmin",
                inputEmail,
                inputLogin,
                inputFirstName,
                inputSecondName,
                inputDisplayName,
                inputPhone,
                footer: [
                    new Link({title: "Изменить данные", href: "#"}),
                    new Link({title: "Изменить пароль", href: "#"}),
                    new Link({title: "Выйти", href: "#", classes: "link--red"}),
                ],
            }
        )
    }

    render() {
        return this.compile(`
            {{{ userPhoto }}}
            <div class="profile__name">{{ userName }}</div>
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
