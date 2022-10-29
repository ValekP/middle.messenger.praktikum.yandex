import Block from "../../utils/Block";
import './profile.scss'

type ProfileProps = {
    main: any;
};

export class Profile extends Block {
    constructor(props: ProfileProps) {
        super('div',
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

