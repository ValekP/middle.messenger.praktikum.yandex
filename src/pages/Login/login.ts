import Block from "../../utils/Block";

type LoginProps = {
    inputLogin: any;
    inputPassword: any;
    button: any;
};

export default class Login extends Block {
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
                 {{{inputLogin}}}
                 {{{inputPassword}}}
            </div>
            <div class="auth-form__footer">
                {{{button}}}
                <div class="auth-form__footer_link">
                    <a href="#">Нет аккаунта?</a>
                </div>
            </div>
        `)
    }
}

