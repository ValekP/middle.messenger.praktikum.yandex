import "./chats.scss"
import Block from "../../services/Block"

type ChatsProps = {
    chatsListHeader: object
    chatsList: object[]
}

export class Chats extends Block {
    constructor(props: ChatsProps) {
        super("div",
            {
                attr: {
                    class: "chats"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            {{{ chatsListHeader }}}
            <div class="chats__list">
                {{{chatsList}}}
            </div> 
        `)
    }
}
