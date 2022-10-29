import Block from "../../utils/Block";
import './inputAuth.scss'
import validateInputs from "../../helpers/validateInputs";

type InputAuthProps = {
    type?: 'text' | 'password' | 'email';
    value?: string;
    name?: string;
    label?: string;
    textError?: string;
    onBlur?: EventListener;
    onFocus?: EventListener;
    onChange?: EventListener;
};

export class InputAuth extends Block<InputAuthProps> {
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

    addEvents() {
        this._element.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', (e) => this.inputValidate());
        });
    };

    private getInput() {
        return this._element.querySelector('input') as HTMLInputElement
    }

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

    setError(text: string = "Ошибка") {
        this._inputError(text)
    }

    clearError() {
        this._inputError('', true)
    }

    render() {
        return this.compile(`
            <input type="{{ type }}" name="{{ name }}" value="{{ value }}" placeholder="{{ label }}">
            <label for="{{ name }}">{{ label }}</label>
            {{# if textError}}
                <span>{{ textError }}</span>
            {{/if }}
        `)
    }

    private _inputError(text: string = "", clear: boolean = false) {
        const {value} = this.getInput()
        this.setProps({
            attr: {
                class: clear ? 'input' : 'input input-error'
            },
            textError: clear ? '' : text
        })
        this.getInput().value = value
    }
}
