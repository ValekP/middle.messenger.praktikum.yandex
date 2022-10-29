import Block from "../../utils/Block";

type SignupProps = {
    inputEmail: object | string;
    inputLogin: object | string;
    inputFirstName: object | string;
    inputSecondName: object | string;
    inputPhone: object | string;
    inputPassword: object | string;
    inputPasswordAgain: object | string;
    button: object | string;
};

export default class Signup extends Block<SignupProps> {
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
