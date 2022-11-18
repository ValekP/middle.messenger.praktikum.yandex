import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"

const inputLogin = new Input({
    template: "auth",
    type: "text",
    name: "login",
    label: "Логин"
})

const inputPassword = new Input({
    template: "auth",
    type: "password",
    name: "password",
    label: "Пароль"
})

const button = new Button({
    title: "Войти",
    onClick: () => {
        inputLogin.inputValidate()
        inputPassword.inputValidate()
    }
})

export class Login extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "auth-form-content"
                },
                inputLogin,
                inputPassword,
                button,
            }
        )
    }

    render() {
        return this.compile(`
            <div class="auth-form__main">
                 {{{ inputLogin }}}
                 {{{ inputPassword }}}
            </div>
            <div class="auth-form__footer">
                {{{ button }}}
                <div class="auth-form__footer_link">
                    <a href="#">Нет аккаунта?</a>
                </div>
            </div>
        `)
    }
}
