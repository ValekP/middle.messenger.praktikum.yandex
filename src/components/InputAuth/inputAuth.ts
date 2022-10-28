import Block from "../../utils/Block";
import './inputAuth.scss'

type InputAuthProps = {
    type?: 'text' | 'password' | 'email',
    value?: string,
    name?: string,
    label?: string,
    text_error?: string,
    onBlur?: EventListener,
    onFocus?: EventListener,
    onChange?: EventListener,
};

export class InputAuth extends Block {
    constructor(props: InputAuthProps) {
        const {onBlur, onFocus, onChange, ...rest} = props;
        super('div',
            {
                attr: {
                    class: "input"
                },
                ...rest,
                events: {
                    blur: onBlur,
                    focus: onFocus,
                    input: onChange,
                },
                errorInput: () => {
                    console.log('sdf')
                }
            }
        )
    }



    render() {
        return this.compile(`
            <input type="{{ type }}" name="{{ name }}" placeholder="{{ label }}">
            <label for="{{ name }}">{{ label }}</label>
            {{# if text_error}}
                <span>{{ text_error }}</span>
            {{/if }}
        `)
    }
}

