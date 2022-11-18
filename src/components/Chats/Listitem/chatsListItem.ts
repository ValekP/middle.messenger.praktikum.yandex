import "./chatsListItem.scss"
import Block from "../../../services/Block"

type ChatsListItemProps = {
    photo?: string
    name: string
    date: string
    text: string
    action?: number
    active?: boolean
}

export class ChatsListItem extends Block {
    constructor(props: ChatsListItemProps) {
        super("div",
            {
                attr: {
                    class: "chats-item"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            <div class="chats-item-inner">
                <div class="chats-item__img">
                    {{# if photo }}
                        <img src="{{ photo }}" alt="">
                    {{/if }}
                </div>
                <div class="chats-item__body">
                    <div class="chats-item__header">
                        <div class="chats-item__header_name">{{ name }}</div>
                        <div class="chats-item__header_time">{{ date }}</div>
                    </div>
                    <div class="chats-item__text">{{ text }}</div>
                    {{# if action}}
                        <div class="chats-item__action">{{ action }}</div>
                    {{/if }}
                </div>
            </div>           
        `)
    }
}
