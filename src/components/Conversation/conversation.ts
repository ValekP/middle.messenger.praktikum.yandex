import './conversation.scss'
import Block from '../../services/Block'
import ConversationHeader from './Header'
import ConversationMessage from './Message'
import ConversationFooter from './Footer'
import Actions from '../../services/Store/Actions'
import { TChatMessages } from './Message/message'

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
    constructor (props: ConversationProps) {
        const {
            id,
            ...rest
        } = props

        super('div',
            {
                attr: {
                    class: 'conversation'
                },
                ...rest,
                id,
                header: null,
                messages: null,
                footer: null
            }
        )
    }

    setHeader (title: string, avatar: string) {
        return new ConversationHeader({
            title,
            avatar
        })
    }

    getMessages () {
        return Actions.getChatMessages().map(msg => new ConversationMessage(msg)).reverse()
    }

    updateMessages () {
        this._children.messages = this.getMessages()
    }

    setMessages (msgs: any[] = []) {
        this._children.messages = [...this._children.messages, ...msgs]
        this.scrollMsg()
    }

    scrollMsg () {
        const scrollMsg = this._element.querySelector('.conversation__content')
        if (scrollMsg) {
            scrollMsg.scrollTop = scrollMsg.scrollHeight
        }
    }

    setNewMessages (msg: TChatMessages) {
        const mst = [new ConversationMessage(msg)]
        this.setMessages(mst)
    }

    hide () {
        this.setProps({
            ...this._props,
            id: null,
            header: null,
            messages: null,
            footer: null
        })
    }

    setFooter () {
        return new ConversationFooter()
    }

    async view () {
        const state = await Actions.getActiveChat()
        this.setProps({
            ...this._props,
            id: state.id,
            header: this.setHeader(state.title, state.avatar),
            messages: this.getMessages(),
            footer: this.setFooter()
        })
        this.scrollMsg()
    }

    render () {
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
