import "./profile.scss"
import Block from "../../services/Block"

type ProfileProps = {
    main: object | string
    mountFn?: Function
}

export class Profile extends Block {
    constructor(props: ProfileProps) {
        super("div",
            {
                attr: {
                    class: "profile-container"
                },
                ...props
            }
        )
    }

    componentDidMount() {
        if (this._props.mountFn) {
            this._props.mountFn()
        }
    }

    render() {
        return this.compile(`
            {{{ main }}}
        `)
    }
}
