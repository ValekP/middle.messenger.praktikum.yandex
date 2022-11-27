import "./conversation.scss"
import Block from "../../services/Block"
import ConversationHeader from "./Header"
import ConversationMessage from "./Message"
import ConversationFooter from "./Footer"
import Actions from "../../services/Store/Actions"

type ConversationProps = {
    id?: number
    header?: object
    messages?: object
    footer?: object
}

export type TConversationUsers = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string | null,
    role: string
}

export type TActiveConversationUsers = {
    id: number | null,
    title: string,
    avatar: string | null,
    users: TConversationUsers[],
}

export class Conversation extends Block {
    constructor(props: ConversationProps) {
        const {id, ...rest} = props

        super("div",
            {
                attr: {
                    class: "conversation"
                },
                ...rest,
                id,
                header: null,
                messages: null,
                footer: null,
            }
        )
    }

    setHeader(title: string, avatar: string) {
        return new ConversationHeader({
            title,
            avatar
        })
    }

    setMessages() {
        return [
            new ConversationMessage({
                text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
                time: "11:56"
            }),
            new ConversationMessage({
                text: "Круто!",
                time: "12:00",
                myMessage: true
            })
        ]
    }

    setFooter() {
        return new ConversationFooter({})
    }

    view() {
        const state = Actions.getActiveChatState()
        this.setProps({
            ...this._props,
            header: this.setHeader(state.title, state.avatar),
            messages: this.setMessages(),
            footer: this.setFooter(),
        })
    }

    render() {
        return this.compile(`
            {{# if id }}
                {{{ header }}}
                <div class="conversation__content">
                    <div class="messages">
                        {{{ messages }}}                   
                    </div>
                </div>
                {{{ footer }}}
            {{ else }}
                <div class="conversation__content">
                    <div class="conversation-preview">Выберите чат для общения</div>
                </div>
            {{/if }}
            
        `)
    }
}
