import "./message.scss"
import Block from "../../../services/Block"

type ConversationMessageProps = {
    text: string
    time: string
    myMessage?: boolean
}

export type TChatMessages = {
    className?: string
    id?: number
    chat_id: number
    time: string
    type: string
    user_id: string
    content: string
    myMessage: boolean
    file?: {
        id: number
        user_id: number
        path: string
        filename: string
        content_type: string
        content_size: number
        upload_date: string
    }
}

export class ConversationMessage extends Block {
    constructor(props: ConversationMessageProps) {
        const {myMessage = false, ...rest} = props

        super("div",
            {
                attr: {
                    class: `message ${myMessage ? "message-my" : ""}`
                },
                ...rest,
                myMessage
            }
        )
    }

    render() {
        return this.compile(`
            <div class="message-inner">
                <div class="message__media"></div>
                <div class="message__text">
                    {{ text }}
                </div>
                <div class="message__info">
                    <div class="message__info_time">{{ time }}</div>
                </div>
            </div>
        `)
    }
}
