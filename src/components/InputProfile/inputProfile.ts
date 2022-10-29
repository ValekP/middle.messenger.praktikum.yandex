import Block from "../../utils/Block";
import './inputProfile.scss'
import validateAuth from "../../helpers/validateAuth";

type InputProfileProps = {
    type?: 'text' | 'password' | 'email';
    value?: string;
    name?: string;
    label?: string;
    text_error?: string;
    onBlur?: EventListener;
    onFocus?: EventListener;
    onChange?: EventListener;
};

export class InputProfile extends Block {
    constructor(props: InputProfileProps) {
        const {onBlur, onFocus, onChange, ...rest} = props;
        super('div',
            {
                attr: {
                    class: "profile-field"
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
            <label for="{{ name }}" class="profile-field__label">{{ label }}</label>
            <input class="profile-field__value" type="{{ type }}" name="{{ name }}" value="{{ value}}" placeholder="{{ label }}">
            
            {{# if text_error}}
                <span class="profile-field__error">{{ text_error }}</span>
            {{/if }}
        `)
    }
}

