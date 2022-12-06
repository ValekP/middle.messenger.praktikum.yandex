import Page from "../../layouts/Page"
import Chats from "../../components/Chats"
import ChatsListHeader from "../../components/Chats/Header"
import Conversation from "../../components/Conversation"
import AuthController from "../../controllers/AuthController"
import {router} from "../../index"
import {webpath} from "../../webpath"


const chatsListHeader = new ChatsListHeader({})

export const conversation = new Conversation({})

const chatsList: never[] = []

export const chatsSidebar = new Chats({
    chatsListHeader,
    chatsList
})

const ChatsPage = {
    pathname: webpath.chats,
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
