import './indexMenu.scss'
import Block from '../../services/Block'
import { router } from '../../index'
import { webpath } from '../../webpath'

export default class IndexMenu extends Block {
    constructor () {
        super('div',
            {
                attr: {
                    class: 'index-menu'
                },

                nav: {
                    [webpath.login]: {
                        title: 'Login'
                    },
                    [webpath.signup]: {
                        title: 'Signup'
                    },
                    [webpath.chats]: {
                        title: 'Chats'
                    },
                    [webpath.profile]: {
                        title: 'Profile'
                    },
                    [webpath.profileEdit]: {
                        title: 'Profile Edit'
                    },
                    [webpath.profilePassword]: {
                        title: 'Profile Password'
                    },
                    [webpath.error404]: {
                        title: '404'
                    },
                    [webpath.error500]: {
                        title: '500'
                    }
                }
            }
        )
    }

    addEvents () {
        this._element?.querySelectorAll('.index-menu__item_link').forEach(item => {
            item.addEventListener('click', (e) => {
                // @ts-ignore
                const attrHref = e.target.attributes.href.value
                if (attrHref) {
                    e.preventDefault()
                    router.go(attrHref)
                }
            })
        })
    }

    render () {
        return this.compile(`
            <ul class="index-menu-list">
                {{#each nav}}
                    <li class="index-menu__item"><a href="{{ @key }}" class="index-menu__item_link">{{ title }}</a></li>
                {{/each}}
            </ul>
        `)
    }
}
