import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"

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
    onClick: () => {
        inputEmail.inputValidate()
        inputLogin.inputValidate()
        inputFirstName.inputValidate()
        inputSecondName.inputValidate()
        inputPhone.inputValidate()
        inputPassword.inputValidate()
        inputPasswordAgain.inputValidate()
    }
})

export class Signup extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "auth-form-content"
                },
                inputEmail,
                inputLogin,
                inputFirstName,
                inputSecondName,
                inputPhone,
                inputPassword,
                inputPasswordAgain,
                button,
            }
        )
    }

    render() {
        return this.compile(`
            <div class="auth-form__main">
                 {{{ inputEmail }}}
                 {{{ inputLogin }}}
                 {{{ inputFirstName }}}
                 {{{ inputSecondName }}}
                 {{{ inputPhone }}}
                 {{{ inputPassword }}}
                 {{{ inputPasswordAgain }}}
            </div>
            <div class="auth-form__footer">
                {{{ button }}}
                <div class="auth-form__footer_link">
                    <a href="#">Войти</a>
                </div>
            </div>
        `)
    }
}
