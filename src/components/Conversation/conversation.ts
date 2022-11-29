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

    async getMessages() {
        // return Actions.getChatMessages().map(msg => new ConversationMessage({
        //     text: msg.content,
        //     time: msg.time,
        //     myMessage: msg.myMessage
        // }))

        let msgs = Actions.getChatMessages().map(msg => new ConversationMessage({
            text: msg.content,
            time: msg.time,
            myMessage: msg.myMessage
        }))

        console.log(msgs)

        // this._props.messages = msgs
    }

    setFooter() {
        return new ConversationFooter({})
    }

    async view() {
        const state = await Actions.getActiveChat()
        await console.log(state)
        // const messages = await Actions.getChatMessages()
        // await console.log(messages)
        setInterval(() => this.getMessages(), 3000)

        // await ChatController.requestChatUsers(chat)
        // const state = await Actions.getActiveChatState()
        // //await console.log(state)
        // const messages = await Actions.getChatMessages()


        //await console.log(messages)
        this.setProps({
            ...this._props,
            id: state.id,
            header: this.setHeader(state.title, state.avatar),
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
