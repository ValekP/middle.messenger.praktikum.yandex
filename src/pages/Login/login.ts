import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"
import validateInputsList from "../../helpers/validateInputsList"
import AuthController from "../../controllers/AuthController"
import Link from "../../components/Link"
import {webpath} from "../../webpath";

export type TLogin = {
    login: object | string
    password: object | string
}

const inputFields: TLogin = {
    login: new Input({
        template: "auth",
        type: "text",
        name: "login",
        label: "Логин",
        value: "Magnus36"
    }),
    password: new Input({
        template: "auth",
        type: "password",
        name: "password",
        label: "Пароль",
        value: "qwerty123456789"
    })
}

const button = new Button({
    title: "Войти",
    onClick: async (e: Event) => {
        e.preventDefault()
        const inputs = validateInputsList(inputFields)
        if (inputs) {
            await AuthController.login(inputs as TLogin)
        }
    }
})

const link = new Link({title: "Нет аккаунта?", href: webpath.signup})

export default class Login extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "auth-form-content"
                },
                ...inputFields,
                button,
                link
            }
        )
    }

    render() {
        return this.compile(`
            <div class="auth-form__main">
                 {{{ login }}}
                 {{{ password }}}
            </div>
            <div class="auth-form__footer">
                {{{ button }}}
                <div class="auth-form__footer_link">
                    {{{ link }}}
                </div>
            </div>
        `)
    }
}
