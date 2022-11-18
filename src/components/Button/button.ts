import "./button.scss"
import Block from "../../services/Block"

type ButtonProps = {
    title: string
    onClick?: EventListener
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        const {onClick, ...rest} = props
        super("div",
            {
                attr: {
                    class: "btn-wrap"
                },
                ...rest,
                events: {
                    click: onClick
                }
            }
        )
    }

    render() {
        return this.compile(`
            <button class="btn">{{ title }}</button>
        `)
    }
}
