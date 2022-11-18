import "./indexMenu.scss"
import Block from "../../services/Block"
import {router} from "../../index"

export class IndexMenu extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "index-menu"
                },

                nav: {
                    "/login": {
                        title: "Login",
                    },
                    "/signup": {
                        title: "Signup",
                    },
                    "/messenger": {
                        title: "Chats",
                    },
                    "/profile": {
                        title: "Profile",
                    },
                    "/profile/edit": {
                        title: "Profile Edit",
                    },
                    "/profile/password": {
                        title: "Profile Password",
                    },
                    "/404": {
                        title: "404",
                    },
                    "/500": {
                        title: "500",
                    }
                }
            }
        )
    }

    addEvents() {
        this._element?.querySelectorAll(".index-menu__item_link").forEach(item => {
            item.addEventListener("click", (e) => {
                // @ts-ignore
                const attrHref = e.target.attributes.href.value
                if (attrHref) {
                    e.preventDefault()
                    router.go(attrHref)
                }
            })
        })
    }

    render() {
        return this.compile(`
            <ul class="index-menu-list">
                {{#each nav}}
                    <li class="index-menu__item"><a href="{{ @key }}" class="index-menu__item_link">{{ title }}</a></li>
                {{/each}}
            </ul>
        `)
    }
}
