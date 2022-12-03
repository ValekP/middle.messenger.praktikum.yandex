import ChatApi, {TChatApiAddUser, TChatApiCreate} from "../services/Api/ChatApi"
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

    public async createChat(data: TChatApiCreate) {
        try {
            await ChatApi.createChat(data)
            Actions.removeActiveChat()
            await this.getChats()
        } catch (error) {
            errorRequest(error)
        }
    }

    public async removeChat() {
        try {
            const {id} = Actions.getActiveChat()
            await ChatApi.removeChat(id)
            const chatList = Actions.getChatListState() as TChatList[]
            const newChatList = chatList.filter(chat => chat.id !== id)
            MessageController.leave()
            Actions.removeActiveChat()
            Actions.setChatList(newChatList)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async addUserChat(data: TChatApiAddUser) {
        try {
            await ChatApi.addUserChat(data)
            await this.setActiveChat(Actions.getActiveChat())
        } catch (error) {
            errorRequest(error)
        }
    }

    public async deleteUserChat(data: TChatApiAddUser) {
        try {
            await ChatApi.deleteUserChat(data)
            await this.setActiveChat(Actions.getActiveChat())
        } catch (error) {
            errorRequest(error)
        }
    }

}

export default new ChatController()
