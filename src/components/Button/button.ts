import Block from "../../utils/Block";
import './button.scss'

type ErrorProps = {
    title: string;
};

export class Button extends Block {
    constructor(props: ErrorProps) {
        super('div',
            {
                attr: {
                    class: "btn-wrap"
                },
                ...props
            }
        )
    }
    render() {
        return this.compile(`
            <button class="btn">{{title}}</button>
        `)
    }
}

