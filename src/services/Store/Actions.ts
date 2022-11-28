import Store from "./Store"
import {TProfile} from "../../pages/UserProfile/userProfile"
import {TChatMessages} from "../../components/Conversation/Message/message"
import {TChatList} from "../../components/Chats/chats"
import {TActiveConversationUsers} from "../../components/Conversation/conversation"

class Actions {
    public setProfile(profile: TProfile) {
        Store.set("profile", profile)
    }

    public getProfileState() {
        const state = Store.getState()
        const profile: TProfile = state.profile ?? {}
        return Object.assign(
            {
                profile:
                    {
                        id: null,
                        first_name: "",
                        second_name: "",
                        display_name: null,
                        login: "",
                        email: "",
                        phone: "",
                        avatar: null,
                    }
            },
            profile
        )
    }

    public getChatListState() {
        const state = Store.getState()
        const chatList: TChatList[] = state.chatList ?? {}

        return Object.assign(
            [],
            chatList
        )
    }

    public setChatList(newChatList: TChatList[]) {
        Store.set('chatList', newChatList)
    }

    public getActiveChatState() {
        const state = Store.getState()
        const activeChat = state.activeChat ?? {}

        return Object.assign(
            {
                id: null,
                title: '',
                avatar: '',
                users: [
                    {
                        id: 0,
                        first_name: '',
                        second_name: '',
                        display_name: '',
                        login: '',
                        email: '',
                        phone: '',
                        avatar: '',
                        role: ''
                    }
                ]
            },
            activeChat
        )
    }

    public setActiveChat(activeChat: TActiveConversationUsers) {
        Store.set('activeChat', activeChat)
    }

    public removeActiveChat() {

        const intialState: TActiveConversationUsers = {
            id: null,
            title: '',
            avatar: '',
            users: [
                {
                    id: 0,
                    first_name: '',
                    second_name: '',
                    display_name: '',
                    login: '',
                    email: '',
                    phone: '',
                    avatar: '',
                    role: ''
                }
            ]
        }

        Store.set('activeChat', intialState)
    }

    public getTokenToMessagesServer() {
        const state = Store.getState()
        const token: string = state.token ?? {}

        return Object.assign(
            '',
            token
        )
    }

    public setTokenToMessagesServer(token: string) {
        Store.set('token', token)
    }

    public getChatMessages() {
        const state = Store.getState()
        const msg: string = state.msg ?? {}

        if (state.msg.length) {
            return Object.assign(
                [
                    {
                        chat_id: 0,
                        time: '',
                        type: '',
                        user_id: '',
                        content: '',
                        myMessage: false,
                        file: {
                            id: 0,
                            user_id: 0,
                            path: '',
                            filename: '',
                            content_type: '',
                            content_size: 0,
                            upload_date: '',
                        }
                    }
                ],
                msg
            )
        } else {
            return []
        }
    }

    public setChatMessages(msg: TChatMessages[]) {
        Store.set('msg', msg)
    }

}

export default new Actions()
