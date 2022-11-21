import "./header.scss"
import Block from "../../../services/Block"
import Link from "../../Link"

type ChatsHeaderProps = {}


const linkProfile = new Link({
    title: `
        <span>Профиль</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1"/>
        </svg>
    `,
    href: "/profile"
})

export class ChatsHeader extends Block {
    constructor(props: ChatsHeaderProps) {
        super("div",
            {
                attr: {
                    class: "chats__header"
                },
                ...props,
                linkProfile
            }
        )
    }

    render() {
        return this.compile(`
            <div class="chats__header-link">
                {{{ linkProfile }}}
            </div>
            <div class="chats__header-search">
                <div class="chats-search">
                    <input type="text" name="search" class="chats-search__input" placeholder="Поиск">
                    <label for="search" class="chats-search__label">
                        <svg width="20" height="15" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.59239 8.41382C6.16047 9.84574 3.83886 9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645 6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277 9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491 4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279 4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277 9.79678Z" />
                        </svg>
                        <span>Поиск</span>
                    </label>
                </div>
            </div>    
        `)
    }
}
