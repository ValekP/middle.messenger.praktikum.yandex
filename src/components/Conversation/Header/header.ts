import "./header.scss"
import Block from "../../../services/Block"

type ConversationHeaderProps = {
    photo?: string
    name: string
}

export class ConversationHeader extends Block {
    constructor(props: ConversationHeaderProps) {
        super("div",
            {
                attr: {
                    class: "conversation__header"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            <div class="conversation__header-info">
                <div class="conversation__header-info_img">
                    {{# if photo }}
                        <img src="{{ photo }}" alt="">
                    {{/if }}
                </div>
                <div class="conversation__header-info_name">{{ name }}</div>
            </div>
            <div class="conversation__header-control">
                <button class="conversation__header-control_btn">
                    <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2ZM3 8C3 8.82843 2.32843 9.5 1.5 9.5C0.671573 9.5 0 8.82843 0 8C0 7.17157 0.671573 6.5 1.5 6.5C2.32843 6.5 3 7.17157 3 8ZM1.5 15.5C2.32843 15.5 3 14.8284 3 14C3 13.1716 2.32843 12.5 1.5 12.5C0.671573 12.5 0 13.1716 0 14C0 14.8284 0.671573 15.5 1.5 15.5Z" />
                    </svg>
                </button>
            </div>
        `)
    }
}
