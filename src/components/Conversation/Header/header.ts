import "./header.scss"
import Block from "../../../services/Block"
import Dropdown from "../../Dropdown"
import Link from "../../Link"
import {webpath} from "../../../webpath"
import ChatController from "../../../controllers/ChatController"
import {chatsSidebar, conversation} from "../../../pages/Chats"
import {TFindUser} from "../../../services/Api/ChatApi"
import ProfileController from "../../../controllers/ProfileController"
import Actions from "../../../services/Store/Actions"
import {TConversationUsers} from "../conversation"

type ConversationHeaderProps = {
    avatar?: string
    title: string
}

const dropdown = new Dropdown({
    title: `
        <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2ZM3 8C3 8.82843 2.32843 9.5 1.5 9.5C0.671573 9.5 0 8.82843 0 8C0 7.17157 0.671573 6.5 1.5 6.5C2.32843 6.5 3 7.17157 3 8ZM1.5 15.5C2.32843 15.5 3 14.8284 3 14C3 13.1716 2.32843 12.5 1.5 12.5C0.671573 12.5 0 13.1716 0 14C0 14.8284 0.671573 15.5 1.5 15.5Z"></path>
        </svg>
    `,
    nav: [
        new Link({
            tag: "li",
            title: "Добавить пользователя",
            href: webpath.profile,
            onClick: async () => {
                const userLogin = prompt("Введите логин пользователя")
                const data: TFindUser = {
                    login: userLogin as string,
                }
                await ProfileController.findUser(data)
            }
        }),
        new Link({
            tag: "li",
            title: "Удалить пользователя",
            href: webpath.profile,
            onClick: async () => {
                const userLogin = prompt("Введите логин пользователя")
                const chat = Actions.getActiveChat()
                const findUser = chat.users.find((item: TConversationUsers) => item.login === userLogin)
                if (findUser) {
                    await ChatController.deleteUserChat({
                        users: [findUser.id],
                        chatId: chat.id
                    })
                } else {
                    alert("Пользователь не найден")
                }
            }
        }),
        new Link({
            tag: "li",
            title: "Удалить чат",
            href: webpath.profile,
            onClick: async () => {
                let isDel = confirm("Вы уверены что хотите удалить чат?")
                if (isDel) {
                    await ChatController.removeChat()
                    await conversation.hide()
                    await chatsSidebar.updateChat()
                }
            }
        })
    ]
})

export class ConversationHeader extends Block {
    constructor(props: ConversationHeaderProps) {
        const {avatar, ...rest} = props

        super("div",
            {
                attr: {
                    class: "conversation__header"
                },
                ...rest,
                dropdown,
                avatar: () => {
                    return avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : null
                },
            }
        )
    }

    render() {
        return this.compile(`
            <div class="conversation__header-info">
                <div class="conversation__header-info_img">
                    {{# if avatar }}
                        <img src="{{ avatar }}" alt="avatar">
                    {{ else }}
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z" fill="#CDCDCD"/>
                        </svg>
                    {{/if }}
                </div>
                <div class="conversation__header-info_name">{{ title }}</div>
            </div>
            <div class="conversation__header-control">
                {{{ dropdown }}}
            </div>
        `)
    }
}
