import Block from "../../utils/Block";
import './page.scss'

type PageProps = {
    sidebar: object | string;
    content: object | string;
};

export class Page extends Block<PageProps> {
    constructor(props: PageProps) {
        super('div',
            {
                attr: {
                    class: "layout"
                },
                ...props
            }
        )
    }

    render() {
        return this.compile(`
            <div class="sidebar">
                {{{ sidebar }}}
            </div>
            <div class="content">
                {{{ content }}}
            </div>
        `)
    }
}
