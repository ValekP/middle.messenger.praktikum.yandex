import './dropdown.scss'
import Block from '../../services/Block'

type DropdownProps = {
    title: string
    nav: object[]
}

export class Dropdown extends Block {
    constructor (props: DropdownProps) {
        const {
            title,
            nav,
            ...rest
        } = props
        super('div',
            {
                attr: {
                    class: 'dropdown'
                },
                ...rest,
                title,
                nav,
                navList: 3,
                events: {
                    click: (e: Event) => {
                        e.preventDefault()
                        this._element?.classList.toggle('active')
                    }
                }
            }
        )
    }

    render () {
        return this.compile(`
            <div class="dropdown-btn">
                {{{ title }}}
            </div>
            <nav class="dropdown-menu">
                <ul>{{{nav}}}</ul>
            </nav>
        `)
    }
}
