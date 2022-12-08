import './auth.scss'
import Block from '../../services/Block'

type AuthProps = {
    title: string
    content: object | string
    mountFn?: Function
}

export class Auth extends Block {
    constructor (props: AuthProps) {
        super('form',
            {
                attr: {
                    class: 'auth'
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
            <div class="auth-form">
                <div class="auth-form-header">
                    <h1>{{ title }}</h1>
                </div>
                {{{ content }}}
            </div>
        `)
    }
}
