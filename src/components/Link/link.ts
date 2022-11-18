import "./link.scss"
import Block from "../../services/Block"

type LinkProps = {
    title: string
    href: string
    classes?: string
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super("div",
            {
                attr: {
                    class: "link-wrap"
                },
                ...props,
            }
        )
    }

    render() {
        return this.compile(`
            <a href="{{ href }}" class="link {{ classes }}">{{ title }}</a>
        `)
    }
}
