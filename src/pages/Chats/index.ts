import Page from "../../layouts/Page"
import Chats from "../../components/Chats"
import ChatsListHeader from "../../components/Chats/Header"
import ChatsListItem, {clickChatItem} from "../../components/Chats/Listitem"
import Conversation from "../../components/Conversation"
import AuthController from "../../controllers/AuthController"
import {router} from "../../index"
import {webpath} from "../../webpath"
import Actions from "../../services/Store/Actions"
import {TChatProps} from "../../components/Chats/Listitem/chatsListItem"
import ChatController from "../../controllers/ChatController"

const chatsListHeader = new ChatsListHeader({})


console.log(Actions.getChatListState())

const conversation = new Conversation({})

const chatsList = Actions.getChatListState().map((chat: TChatProps) => {
    chat = {
        ...chat,
        onClick: async () => {
            await ChatController.requestChatUsers(chat)
            await clickChatItem(chatsList as [], chat)
            conversation.setProps({
                id: chat.id
            })
            conversation.view()
        }
    }
    return new ChatsListItem(chat)
})

const chatsSidebar = new Chats({
    chatsListHeader,
    chatsList
})

const ChatsPage = {
    pathname: "/messenger",
    view: Page,
    props: {
        sidebar: chatsSidebar,
        content: conversation,
        mountFn: () => {
            AuthController.checkAuth().catch(() => {
                router.go(webpath.login)
            })
        }
    }
}

export default ChatsPage
