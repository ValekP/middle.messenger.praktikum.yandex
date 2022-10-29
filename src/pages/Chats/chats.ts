import Block from "../../utils/Block";

type ChatsProps = {};

export class Chats extends Block {
    constructor(props: ChatsProps) {
        super('div',
            {
                ...props,
            }
        )
    }

    render() {
        return this.compile(`
            <ul>
                {{#each nav}}
                    <li><a href="#" data-page="{{ @key }}">{{ title }}</a></li>
                {{/each}}
            </ul>
        `)
    }
}

