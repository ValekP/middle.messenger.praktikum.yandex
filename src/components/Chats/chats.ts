import "./chats.scss"
import Block from "../../services/Block"

export type TChatList = {
    id: number
    title: string
    avatar: null | string
    created_by: number
    unread_count: number
    last_message: {
        id: number
        content: string
        time: Date | string
    }
}

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
