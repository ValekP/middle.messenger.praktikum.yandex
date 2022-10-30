import Block from "../../utils/Block";
import './input.scss'
import validateInputs from "../../helpers/validateInputs";

type InputProps = {
    type?: 'text' | 'password' | 'email';
    value?: string;
    name?: string;
    label?: string;
    textError?: string;
    onBlur?: EventListener;
    onFocus?: EventListener;
    onChange?: EventListener;
    template: 'auth' | 'profile'
};

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        const {onBlur, onFocus, onChange, template, ...rest} = props;
        super('div',
            {
                attr: {
                    class: `input-wrap-${template}`
                },
                ...rest,
                template,
                events: {
                    blur: onBlur,
                    focus: onFocus,
                    input: onChange,
                }
            }
        )
    }

    addEvents() {
        this._element?.querySelectorAll('input').forEach(input => {
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

    setError(text: string = "Ошибка") {
        this._inputError(text)
    }

    clearError() {
        this._inputError('', true)
    }

    render() {
        const input = `<input class="input" type="{{ type }}" name="{{ name }}" value="{{ value}}" placeholder="{{ label }}">`
        const label = `<label for="{{ name }}" class="input-label">{{ label }}</label>`
        const inputTemplate = this._props.template === 'auth' ? `${input}${label}` : `${label}${input}`

        return this.compile(`
            ${inputTemplate}
      
            {{# if textError}}
                <span class="input-error">{{ textError }}</span>
            {{/if }}
        `)
    }

    private getInput() {
        return this._element?.querySelector('input') as HTMLInputElement
    }

    private _inputError(text: string = "", clear: boolean = false) {
        const {value} = this.getInput()
        this.setProps({
            textError: clear ? '' : text
        })
        console.log(this)

        if (this._props.template === 'auth') {
            if (clear) {
                this._element.classList.remove('input-v-error')
            } else {
                this._element.classList.add('input-v-error')
            }
        }

        this.getInput().value = value
    }
}
