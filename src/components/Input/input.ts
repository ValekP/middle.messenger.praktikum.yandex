import "./input.scss"
import validateInputs from "../../helpers/validateInputs"
import Block from "../../services/Block"

type InputProps = {
    staticTmpl?: boolean
    type?: "text" | "password" | "email" | "number"
    value?: string
    name?: string
    label?: string
    textError?: string
    onBlur?: EventListener
    onFocus?: EventListener
    onChange?: EventListener
    template: "auth" | "profile"
}

export class Input extends Block {
    constructor(props: InputProps) {
        const {onBlur, onFocus, onChange, template, staticTmpl = false, ...rest} = props
        super("div",
            {
                attr: {
                    class: `input-wrap-${template}`
                },
                ...rest,
                template,
                staticTmpl,
                events: {
                    blur: onBlur,
                    focus: onFocus,
                    input: onChange,
                }
            }
        )
    }

    addEvents() {
        if (!this._props.staticTmpl) {
            this._element?.querySelectorAll("input").forEach(input => {
                input.addEventListener("blur", this.inputValidate.bind(this))
                input.addEventListener("focus", this.inputValidate.bind(this))
            })
        }
    }

    inputValidate() {
        if (!this._props.staticTmpl) {
            const {value, name} = this.getInput()
            const validate = validateInputs({name, value})
            console.log(validate)
            if (validate) {
                this.setError(validate as string)
                return false
            } else {
                this.clearError()
                return value.length === 0 ? null : value
            }
        }
    }

    setError(text: string = "Ошибка") {
        this._inputError(text)
    }

    clearError() {
        this._inputError("", true)
    }

    inputTmpl() {
        if (this._props.staticTmpl) {
            return `<div class="input">{{ value }}</div>`
        } else {
            return `<input class="input" type="{{ type }}" name="{{ name }}" value="{{ value }}" placeholder="{{ label }}">`
        }
    }

    labelTmpl() {
        if (this._props.staticTmpl) {
            return `<div class="input-label">{{ label }}</div>`
        } else {
            return `<label for="{{ name }}" class="input-label">{{ label }}</label>`
        }
    }

    private getInput() {
        return this._element?.querySelector("input") as HTMLInputElement
    }

    private _inputError(text: string = "", clear: boolean = false) {
        let spanError
        const checkSpan = this._element?.querySelector(".input-error")

        if (checkSpan) {
            spanError = checkSpan
        } else {
            spanError = document.createElement("span")
            spanError.classList.add("input-error")
        }

        spanError.textContent = text
        this._element.appendChild(spanError)

        if (this._props.template === "auth") {
            if (clear) {
                this._element.classList.remove("input-v-error")
            } else {
                this._element.classList.add("input-v-error")
            }
        }
    }

    render() {
        const inputTemplate = this._props.template === "auth" ? `${this.inputTmpl()}${this.labelTmpl()}` : `${this.labelTmpl()}${this.inputTmpl()}`

        return this.compile(`
            ${inputTemplate}
            <span class="input-error">{{ textError }}</span>
        `)
    }
}
