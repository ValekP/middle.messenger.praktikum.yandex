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

    getMessages() {
        console.log(Actions.getChatMessages())
        return Actions.getChatMessages().map(msg => new ConversationMessage({
            text: msg.content,
            time: msg.time,
            myMessage: msg.myMessage
        }))
    }

    setFooter() {
        return new ConversationFooter({})
    }

    view() {
        console.log(Actions.getActiveChatState())
        const state = Actions.getActiveChatState()
        console.log(state)
        this.setProps({
            ...this._props,
            header: this.setHeader(state.title, state.avatar),
            messages: this.getMessages(),
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
