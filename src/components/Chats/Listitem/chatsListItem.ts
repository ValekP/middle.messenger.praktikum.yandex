import "./chatsListItem.scss"
import Block from "../../../services/Block"
import formatDate from "../../../helpers/formatDate"
import Actions from "../../../services/Store/Actions"
import ChatController from "../../../controllers/ChatController"
import {chatsSidebar, conversation} from "../../../pages/Chats"
import MessageController from "../../../controllers/MessageController";

export type TChatProps = {
    id: number
    title: string
    avatar: null | string
    created_by: number
    unread_count: number
    last_message: {
        id: number
        content: string
        time: string
    }
}

export class ChatsListItem extends Block {
    constructor(props: TChatProps) {
        const {avatar, ...rest} = props

        super("div",
            {
                attr: {
                    class: "chats-item"
                },
                ...rest,
                avatar: () => {
                    return avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : null
                },
                lastMsgTime: () => rest.last_message ? formatDate(new Date(Date.parse(rest.last_message.time))) : "",
                events: {
                    click: async () => {
                        if (rest.id !== Actions.getActiveChat().id) {

                            await MessageController.leave()

                            await Actions.removeActiveChat()
                            await ChatController.setActiveChat({...rest, avatar})
                            await chatsSidebar.updateChatList()
                            await conversation.view()
                        }
                    }
                }
            }
        )

        if (rest.id === Actions.getActiveChat().id) {
            this.setActive()
        }
    }

    setActive() {
        this._element.classList.add("active")
    }

    removeActive() {
        this._element.classList.remove("active")
    }

    render() {
        return this.compile(`
            <div class="chats-item-inner">
                <div class="chats-item__img">
                    {{# if avatar }}
                        <img src="{{ avatar }}" alt="">
                    {{ else }}
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z" fill="#CDCDCD"/>
                        </svg>
                    {{/if }}
                </div>
                <div class="chats-item__body">
                    <div class="chats-item__header">
                        <div class="chats-item__header_name">{{ title }}</div>
                        <div class="chats-item__header_time">
                            {{# if last_message.time }}
                                {{ lastMsgTime }}
                            {{/if }}
                        </div>
                    </div>
                    <div class="chats-item__text">
                        {{# if last_message.content }}
                            {{ last_message.content }}
                        {{/if }}
                    </div>
                    {{# if unread_count}}
                        <div class="chats-item__action">{{ unread_count }}</div>
                    {{/if }}
                </div>
            </div>           
        `)
    }
}
