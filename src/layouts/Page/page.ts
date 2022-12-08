import './page.scss'
import Block from '../../services/Block'

type PageProps = {
    sidebar: object | string
    content: object | string
    mountFn?: Function
}

export class Page extends Block {
    constructor (props: PageProps) {
        super('div',
            {
                attr: {
                    class: 'layout'
                },
                ...props
            }
        )
    }

    componentDidMount () {
        if (this._props.mountFn) {
            this._props.mountFn()
        }
    }

    render () {
        return this.compile(`
            <div class="sidebar">
                {{{ sidebar }}}
            </div>
            <div class="content">
                {{{ content }}}
            </div>
        `)
    }
}
