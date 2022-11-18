import "./error.scss"
import Block from "../../services/Block"
import {router} from "../../index"

type ErrorProps = {
    statusCode: number
    statusDescription: string
}

export class ErrorPage extends Block {
    constructor(props: ErrorProps) {
        super("div",
            {
                attr: {
                    class: "error"
                },
                ...props
            }
        )
    }

    addEvents() {
        const linkBack = this._element?.querySelector("a")
        if (linkBack) {
            linkBack.onclick = (e: Event) => {
                e.preventDefault()
                router.back()
            }
        }
    }

    render() {
        return this.compile(`
            <section class="error-content">
                <div class="error__code">{{ statusCode }}</div>
                <div class="error__text">{{ statusDescription }}</div>
                <div class="error__link">
                    <a href="">Назад к чатам</a>
                </div>
            </section>
        `)
    }
}
