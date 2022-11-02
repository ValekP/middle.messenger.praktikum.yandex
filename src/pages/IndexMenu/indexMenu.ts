import Block from "../../utils/Block";
import renderDOM from "../../utils/renderDOM";
import './indexMenu.scss'


type IndexMenuProps = {
    nav: object;
};

export class IndexMenu extends Block<IndexMenuProps> {
    constructor(props: IndexMenuProps) {
        super('div',
            {
                attr: {
                    class: "index-menu"
                },
                ...props,
                events: {
                    click: (e: Event) => {
                        // @ts-ignore
                        if ('page' in e.target.dataset) {
                            e.preventDefault();
                            // @ts-ignore
                            history.pushState(null, null, e.target.dataset.page);
                            // @ts-ignore
                            renderDOM("#root", props.nav[e.target.dataset.page].page)
                        }
                    }
                }
            }
        )
    }

    render() {
        return this.compile(`
            <ul class="index-menu-list">
                {{#each nav}}
                    <li class="index-menu__item"><a href="#" class="index-menu__item_link" data-page="{{ @key }}">{{ title }}</a></li>
                {{/each}}
            </ul>
        `)
    }
}
