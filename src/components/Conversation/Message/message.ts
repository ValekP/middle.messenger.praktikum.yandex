import "./message.scss"
import Block from "../../../services/Block"

type ConversationMessageProps = {
    text: string
    time: string
    myMessage?: boolean
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
