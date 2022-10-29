import Block from "../../utils/Block";
import './inputAuth.scss'
import validateAuth from "../../helpers/validateAuth";

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
                }
            }
        )
    }

    private getInput() {
        return this._element.querySelector('input') as HTMLInputElement
    }

    private _inputError(text: string = "", clear: boolean = false) {
        const {value} = this.getInput()
        this.setProps({
            attr: {
                class: clear ? 'input' : 'input input-error'
            },
            text_error: clear ? '' : text
        })
        this.getInput().value = value
    }

    setError(text: string = "Ошибка") {
        this._inputError(text)
    }

    clearError() {
        this._inputError('', true)
    }

    inputValidate(focus: boolean = false): void {
        const {value, name} = this.getInput()
        const validate = validateAuth({name, value})
        if (validate) {
            this.setError(validate as string)
        } else {
            this.clearError()
        }
        if (focus) {
            this.getInput().focus()
        }
    }


    render() {
        return this.compile(`
            <input type="{{ type }}" name="{{ name }}" value="{{ value}}" placeholder="{{ label }}">
            <label for="{{ name }}">{{ label }}</label>
            {{# if text_error}}
                <span>{{ text_error }}</span>
            {{/if }}
        `)
    }
}

