import Block from "../../utils/Block";
import './error.scss'

type ErrorProps = {
    statusCode: number;
    statusDescription: string;
};

export class ErrorPage extends Block {
    constructor(props: ErrorProps) {
        super('div',
            {
                attr: {
                    class: "error"
                },
                ...props
            }
        )
    }
    render() {
        return this.compile(`
            <section class="error-content">
                <div class="error__code">{{ statusCode }}</div>
                <div class="error__text">{{ statusDescription }}</div>
                <div class="error__link">
                    <a href="#">Назад к чатам</a>
                </div>
            </section>
        `)
    }
}

