import Block from "../../utils/Block";
import './chatsList.scss'

type ChatsListProps = {
    chats: object;
};

export class ChatsList extends Block {
    constructor(props: ChatsListProps) {
        super('div',
            {
                attr: {
                    class: "chats"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            <div class="chats__header">
                <div class="chats__header-link">
                    <a href="#">
                        <span>Профиль</span>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1"/>
                        </svg>
                    </a>
                </div>
                <div class="chats__header-search">
                    <div class="chats-search">
                        <input type="text" name="search" placeholder="Поиск">
                        <label for="search">
                            <svg width="20" height="15" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.59239 8.41382C6.16047 9.84574 3.83886 9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645 6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277 9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491 4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279 4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277 9.79678Z" />
                            </svg>
                            <span>Поиск</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="chats__list">
                {{#each chats}}
                    <div class="chats-item{{# if active}} chats-item-active{{/if }}">
                        <div class="chats-item-inner">
                            <div class="chats-item__img">
                                <!--<img src="" alt="">-->
                            </div>
                            <div class="chats-item__body">
                                <div class="chats-item__header">
                                    <div class="chats-item__header_name">{{ this.name }}</div>
                                    <div class="chats-item__header_date">{{ this.date }}</div>
                                </div>
                                <div class="chats-item__text">{{ this.text }}</div>
                                {{# if action}}
                                    <div class="chats-item__action">{{ this.action }}</div>
                                {{/if }}
                            </div>
                        </div>
                    </div>
                {{/each}}
            </div>    
        `)
    }
}

