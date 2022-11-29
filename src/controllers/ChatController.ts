import ChatApi from "../services/Api/ChatApi"
import Actions from "../services/Store/Actions"
import {errorRequest} from "../utils/errorRequest"
import {TChatList} from "../components/Chats/chats"
import {TActiveConversationUsers, TConversationUsers} from "../components/Conversation/conversation"
import MessageController, {TMessageWebSocketConnect} from "./MessageController"


class ChatController {
    public async getChats() {
        try {
            const getChatResponse = await ChatApi.getChat()
            Actions.setChatList(getChatResponse)
        } catch (error) {
            errorRequest(error)
        }
    }


    public async setActiveChat(data: TChatList) {
        try {
            const {id, title, avatar} = data
            const getChatUsersResponse = await ChatApi.getChatUsers(id)
            const activeChat: TActiveConversationUsers =
                {
                    id: id,
                    title: title,
                    avatar: avatar,
                    users: getChatUsersResponse as TConversationUsers[]
                }

            Actions.setActiveChat(activeChat)
            await this.getTokenToMessagesServer(id)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async getTokenToMessagesServer(chatId: number) {
        try {
            const data = await ChatApi.getTokenToMessagesServer(chatId)
            if (!data.token) {
                return
            }
            Actions.setTokenToMessagesServer(data.token)
            const {id} = Actions.getProfileState()
            if (!id) {
                return
            }

            const socketOptios: TMessageWebSocketConnect =
                {
                    userId: id,
                    chatId: chatId,
                    token: data.token
                }
            MessageController.connect(socketOptios)
        } catch (error) {
            errorRequest(error)
        }
    }


}

export default new ChatController()
