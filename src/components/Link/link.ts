import "./link.scss"
import Block from "../../services/Block"
import {router} from "../../index"

type LinkProps = {
    tag?: string
    title: string
    href: string
    classes?: string
    onClick?: EventListener
}

export class Link extends Block {
    constructor(props: LinkProps) {
        const {onClick, tag = "div", ...rest} = props
        super(tag,
            {
                attr: {
                    class: "link-wrap"
                },
                ...rest,
                events: {
                    click: onClick ? onClick : (e: Event) => {
                        e.preventDefault()
                        router.go(this._props.href)
                    }
                }
            }
        )
    }

    render() {
        return this.compile(`
            <a href="{{ href }}" class="link {{ classes }}">{{{ title }}}</a>
        `)
    }
}
