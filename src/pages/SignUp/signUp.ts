import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Link from "../../components/Link"
import validateInputsList from "../../helpers/validateInputsList"
import AuthController from "../../controllers/AuthController"

export type ISignUp = {
    email: object | string
    login: object | string
    first_name: object | string
    second_name: object | string
    phone: object | string
    password: object | string
}

const inputFields: ISignUp = {
    email: new Input({
        template: "auth",
        type: "email",
        name: "email",
        label: "Почта",
        value: "test@sdf.rr",
    }),
    login: new Input({
        template: "auth",
        type: "text",
        name: "login",
        label: "Логин",
        value: "hgfgh45",
    }),
    first_name: new Input({
        template: "auth",
        type: "text",
        name: "first_name",
        label: "Имя",
        value: "Вика",
    }),
    second_name: new Input({
        template: "auth",
        type: "text",
        name: "second_name",
        label: "Фамилия",
        value: "Викина",
    }),
    phone: new Input({
        template: "auth",
        type: "text",
        name: "phone",
        label: "Телефон",
        value: "74563353363",
    }),
    password: new Input({
        template: "auth",
        type: "password",
        name: "password",
        label: "Пароль",
        value: "11111111q",
    })
}

const inputFieldsExtend = {
    ...inputFields,
    password_again: new Input({
        template: "auth",
        type: "password",
        name: "password_again",
        label: "Пароль (ещё раз)",
        value: "11111111q",
    })
}

const button = new Button({
    title: "Зарегистрироваться",
    onClick: async (e: Event) => {
        e.preventDefault()
        const inputs = validateInputsList(inputFields)
        const inputsExtend = validateInputsList(inputFieldsExtend)
        if (inputs && inputsExtend) {
            await AuthController.signUp(inputs as ISignUp)
        }
    }
})

const link = new Link({title: "Войти", href: "/login"})

export default class SignUp extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "auth-form-content"
                },
                ...inputFieldsExtend,
                button,
                link
            }
        )
    }

    render() {
        return this.compile(`
            <div class="auth-form__main">
                 {{{ email }}}
                 {{{ login }}}
                 {{{ first_name }}}
                 {{{ second_name }}}
                 {{{ phone }}}
                 {{{ password }}}
                 {{{ password_again }}}
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
