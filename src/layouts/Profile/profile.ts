import "./profile.scss"
import Block from "../../services/Block"

type ProfileProps = {
    main: object | string
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

    render() {
        return this.compile(`
            {{{ main }}}
        `)
    }
}
