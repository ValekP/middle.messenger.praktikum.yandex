import Block from "../../utils/Block";
import './auth.scss'

type AuthProps = {
    title: string;
    content: object | string;
};

export class Auth extends Block<AuthProps> {
    constructor(props: AuthProps) {
        super('div',
            {
                attr: {
                    class: "auth"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            <section class="auth-form">
                <div class="auth-form-header">
                    <h1>{{ title }}</h1>
                </div>
                {{{ content }}}
            </section>
        `)
    }
}
