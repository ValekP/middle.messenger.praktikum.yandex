import Block from "../../utils/Block";

type SignupProps = {
    inputEmail: any,
    inputLogin: any,
    inputFirstName: any,
    inputSecondName: any,
    inputPhone: any,
    inputPassword: any,
    inputPasswordAgain: any,
    button: any;
};

export default class Signup extends Block {
    constructor(props: SignupProps) {
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
                 {{{inputEmail}}}
                 {{{inputLogin}}}
                 {{{inputFirstName}}}
                 {{{inputSecondName}}}
                 {{{inputPhone}}}
                 {{{inputPassword}}}
                 {{{inputPasswordAgain}}}
            </div>
            <div class="auth-form__footer">
                {{{button}}}
                <div class="auth-form__footer_link">
                    <a href="#">Войти</a>
                </div>
            </div>
        `)
    }
}

