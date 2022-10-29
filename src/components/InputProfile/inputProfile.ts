import Block from "../../utils/Block";
import './inputProfile.scss'
import validateInputs from "../../helpers/validateInputs";

type InputProfileProps = {
    type?: 'text' | 'password' | 'email';
    value?: string;
    name?: string;
    label?: string;
    textError?: string;
    onBlur?: EventListener;
    onFocus?: EventListener;
    onChange?: EventListener;
};

export class InputProfile extends Block<InputProfileProps> {
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

    addEvents() {
        this._element.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', (e) => this.inputValidate());
        });
    };

    inputValidate(focus: boolean = false): void {
        const {value, name} = this.getInput()
        const validate = validateInputs({name, value})
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
            
            {{# if textError}}
                <span class="profile-field__error">{{ textError }}</span>
            {{/if }}
        `)
    }

    setError(text: string = "Ошибка") {
        this._inputError(text)
    }

    clearError() {
        this._inputError('', true)
    }

    private getInput() {
        return this._element?.querySelector('input') as HTMLInputElement
    }

    private _inputError(text: string = "", clear: boolean = false) {
        const {value} = this.getInput()
        this.setProps({
            textError: clear ? '' : text
        })
        this.getInput().value = value
    }
}
