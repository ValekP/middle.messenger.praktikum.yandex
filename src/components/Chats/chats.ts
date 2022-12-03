import "./chats.scss"
import Block from "../../services/Block"
import Actions from "../../services/Store/Actions"
import ChatController from "../../controllers/ChatController"
import ChatsListItem from "./Listitem"
import {TChatProps} from "./Listitem/chatsListItem"

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

    async updateChatList() {
        await ChatController.getChats()
        const chatsList = Actions.getChatListState().map((chat: TChatProps) => new ChatsListItem(chat))
        this._children.chatsList = [...chatsList]
    }

    async componentDidMount() {
        Actions.removeActiveChat()
        await this.updateChatList()
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
