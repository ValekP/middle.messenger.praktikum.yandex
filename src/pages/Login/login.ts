import Block from "../../utils/Block";

type LoginProps = {
    inputLogin: object | string;
    inputPassword: object | string;
    button: object | string;
};

export default class Login extends Block<LoginProps> {
    constructor(props: LoginProps) {
        super('div',
            {
                attr: {
                    class: "auth-form-content"
                },
                ...props
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
