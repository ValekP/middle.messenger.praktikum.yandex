import "./header.scss"
import Block from "../../../services/Block"
import Link from "../../Link"
import {webpath} from "../../../webpath"
import ProfilePhoto from "../../Profile/Photo"
import Dropdown from "../../Dropdown"
import ChatController from "../../../controllers/ChatController"
import {chatsSidebar} from "../../../pages/Chats"

type ChatsHeaderProps = {}

const userPhoto = new ProfilePhoto()

const dropdown = new Dropdown({
    title: `
        <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2ZM3 8C3 8.82843 2.32843 9.5 1.5 9.5C0.671573 9.5 0 8.82843 0 8C0 7.17157 0.671573 6.5 1.5 6.5C2.32843 6.5 3 7.17157 3 8ZM1.5 15.5C2.32843 15.5 3 14.8284 3 14C3 13.1716 2.32843 12.5 1.5 12.5C0.671573 12.5 0 13.1716 0 14C0 14.8284 0.671573 15.5 1.5 15.5Z"></path>
        </svg>
    `,
    nav: [
        new Link({
            tag: "li",
            title: "Создать чат",
            href: "/add/chat",
            onClick: async () => {
                const nameChat = prompt("Название чата")
                await ChatController.createChat({
                    title: nameChat as string
                })
                await chatsSidebar.updateChatList()
            }
        })
    ]
})

const linkProfile = new Link({
    title: `
        <span>Профиль</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1"/>
        </svg>
    `,
    href: webpath.profile
})

export class ChatsHeader extends Block {
    constructor(props: ChatsHeaderProps) {
        super("div",
            {
                attr: {
                    class: "chats__header"
                },
                ...props,
                userPhoto,
                linkProfile,
                dropdown
            }
        )
    }

    render() {
        return this.compile(`
            <nav class="chats__header_menu">
                <ul class="menu">
                    <li class="menu-item">{{{ linkProfile }}}</li>
                    <li class="menu-item">{{{ dropdown }}}</li>
                </ul>
            </nav>
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
