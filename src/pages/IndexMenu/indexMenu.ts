import Block from "../../utils/Block";
import renderDOM from "../../utils/renderDOM";

type IndexMenuProps = {
    nav: object;
};

export class IndexMenu extends Block {
    constructor(props:IndexMenuProps) {
        super('div',
            {
                attr: {
                    class: "index-menu"
                },
                ...props,
                events: {
                    click: (e:Event) => {
                        // @ts-ignore
                        if('page' in e.target.dataset){
                            e.preventDefault();
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
            <ul>
                {{#each nav}}
                    <li><a href="#" data-page="{{ @key }}">{{ title }}</a></li>
                {{/each}}
            </ul>
        `)
    }
}

