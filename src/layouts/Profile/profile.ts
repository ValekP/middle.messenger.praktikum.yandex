import Block from "../../utils/Block";
import './profile.scss'

type ProfileProps = {
    main: object | string;
};

export class Profile extends Block<ProfileProps> {
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
