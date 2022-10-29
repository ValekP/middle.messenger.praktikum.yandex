import Block from "../../utils/Block";
import './button.scss'

type ErrorProps = {
    title: string;
    onClick?: EventListener;
};

export class Button extends Block {
    constructor(props: ErrorProps) {
        const {onClick, ...rest} = props;
        super('div',
            {
                attr: {
                    class: "btn-wrap"
                },
                ...rest,
                events: {
                    click: onClick
                }
            }
        )
    }
    render() {
        return this.compile(`
            <button class="btn">{{ title }}</button>
        `)
    }
}

