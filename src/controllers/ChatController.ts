import {errorRequest} from "../utils/errorRequest"
import Actions from "../services/Store/Actions"
import ChatApi from "../services/Api/ChatApi"
import {TChatList} from "../components/Chats/chats"
import MessageController, {TMessageWebSocketConnect} from "./MessageController"
import {TActiveConversationUsers, TConversationUsers} from "../components/Conversation/conversation"


export type TChatApiCreate = {
    title: string
}

export type TChatApiAddUser = {
    users: number[]
    chatId: number
}


class ChatController {

    public async request() {
        try {
            const getChatResponse = await ChatApi.getChat()
            Actions.setChatList(getChatResponse)
        } catch (error) {
            errorRequest(error)
        }
    }

    public async createChat(data: TChatApiCreate) {
        try {
            await ChatApi.createChat(data)
            Actions.removeActiveChat()
            await this.request()
        } catch (error) {

        }
    }

    public async removeChat() {
        try {
            const {id} = Actions.getActiveChatState()

            if (!id) {
                return alert('Выберите чат, кликните и повторите удаление')
            }

            await ChatApi.removeChat(id)
            const chatList = Actions.getChatListState() as TChatList[]
            const newChatList = chatList.filter(chat => chat.id !== id)
            //обновим store, чтобы удалить лишний чат
            //MessageController.leave()
            Actions.removeActiveChat()
            Actions.setChatList(newChatList)
        } catch (error) {
            errorRequest(error)
        }

    }

    public async addUserChat(data: TChatApiAddUser) {
        try {
            await ChatApi.addUserChat(data)

            //обновим store, чтобы получить изменения в активном чате
            await this.requestChatUsers(Actions.getActiveChatState())
        } catch (error) {
            errorRequest(error)
        }
    }

    public async deleteUserChat(data: TChatApiAddUser) {
        try {
            await ChatApi.deleteUserChat(data)

            //обновим store, чтобы получить изменения в активном чате
            await this.requestChatUsers(Actions.getActiveChatState())
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

    public async requestChatUsers(data: TChatList) {
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

    public async updateAvatar(data: FormData) {
        try {
            const getChatAvatarResponse = await ChatApi.updateAvatar(data)
            if (!getChatAvatarResponse.avatar) {
                return
            }

            let {id, avatar, users} = Actions.getActiveChatState()
            avatar = getChatAvatarResponse.avatar
            const chatList = Actions.getChatListState() as TChatList[]

            const updateChatList = chatList.map(chat => {
                if (chat.id === id) {
                    chat.avatar = avatar
                    Actions.setActiveChat({...chat, users: users})
                    return chat
                }
                return chat
            })
            Actions.setChatList(updateChatList)

        } catch (error) {
            errorRequest(error)
        }
    }

}

export default new ChatController()
