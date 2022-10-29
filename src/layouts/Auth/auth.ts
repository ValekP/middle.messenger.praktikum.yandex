import Block from "../../utils/Block";
import './auth.scss'

type AuthProps = {
    title: string;
    content: any;
};

export class Auth extends Block {
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
                    <h2>{{title}}</h2>
                </div>
                {{{content}}}
            </section>
        `)
    }
}
