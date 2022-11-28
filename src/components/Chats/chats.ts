import "./chats.scss"
import Block from "../../services/Block"
import Actions from "../../services/Store/Actions";
import {TChatProps} from "./Listitem/chatsListItem";
import ChatController from "../../controllers/ChatController";
import ChatsListItem, {clickChatItem} from "./Listitem";
import {conversation} from "../../pages/Chats";

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
        await ChatController.request()
        const chatsList = Actions.getChatListState().map((chat: TChatProps) => {
            chat = {
                ...chat,
                onClick: async () => {
                    const {id1} = Actions.getActiveChatState();
                    console.log(id1)

                    await ChatController.requestChatUsers(chat)
                    await clickChatItem(chatsList as [], chat)

                    // await conversation.setProps({
                    //     id: chat.id
                    // })
                    await conversation.view()
                }
            }
            return new ChatsListItem(chat)
        })
        console.log("chats", chatsList)
        this.setProps({...this._props, chatsList})
    }

    componentDidMount() {
        this.updateChatList()
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
