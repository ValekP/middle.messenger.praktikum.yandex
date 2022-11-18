import "./conversation.scss"
import Block from "../../services/Block"

type ConversationProps = {
    header: object
    messages: object[]
    footer: object
}

export class Conversation extends Block {
    constructor(props: ConversationProps) {
        super("div",
            {
                attr: {
                    class: "conversation"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            {{{ header }}}
            <div class="conversation__content">
                <div class="messages">
                    {{{ messages }}}                   
                </div>
            </div>
            {{{ footer }}}
        `)
    }
}
