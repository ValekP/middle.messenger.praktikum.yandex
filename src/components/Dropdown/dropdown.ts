import "./dropdown.scss"
import Block from "../../services/Block"

type DropdownProps = {
    title: string
}

export class Dropdown extends Block {
    constructor(props: DropdownProps) {
        super("div",
            {
                attr: {
                    class: "dropdown"
                },
                ...props,
                events: {
                    click: (e: Event) => {
                        e.preventDefault()
                        console.log("ok dropdown")
                    }
                }
            }
        )
    }

    render() {
        return this.compile(`
            <div class="dropdown-btn">
                {{{ title }}}
            </div>
            <nav class="dropdown-menu">
                test
            </nav>
        `)
    }
}
