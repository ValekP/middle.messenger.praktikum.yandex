type validateAuthProps = {
    name: string,
    value: string;
}

export default function validateAuth(props: validateAuthProps){
    switch (props.name) {
        case "login":
            switch (true) {
                case props.value.length === 0:
                    return "Введите логин"
                case !/^[a-zA-Z0-9](?=.*[a-zA-z])[a-zA-Z0-9-_\.]{2,20}$/.test(props.value):
                    return "Логин должен быть больше 3-х символов на латинице, и не быть только из цифр (допустимы дефис и нижнее подчёркивание)"
                default:
                    return false
            }
        case "first_name":
            switch (true) {
                case props.value.length === 0:
                    return "Введите имя"
                case !/^[A-ZА-Я][A-ZА-Яa-zа-я0-9-\.]{1,40}$/.test(props.value):
                    return "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр"
                default:
                    return false
            }
        case "second_name":
            switch (true) {
                case props.value.length === 0:
                    return "Введите фамилию"
                case !/^[A-ZА-Я][A-ZА-Яa-zа-я0-9-\.]{1,40}$/.test(props.value):
                    return "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр"
                default:
                    return false
            }
        case "password":
            switch (true) {
                case !/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/.test(props.value):
                    return "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
                default:
                    return false
            }
        case "password_again":
            const pass = document.querySelector('[name="password"]') as HTMLInputElement
            switch (true) {
                case props.value.length === 0:
                    return "Повторите пароль"
                case pass && pass.value !== props.value:
                    return "Пароли не совпадают"
                default:
                    return false
            }
        case "email":
            switch (true) {
                case props.value.length === 0:
                    return "Введите электронную почту"
                case !/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(props.value):
                    return "Неверная электронная почта"
                default:
                    return false
            }
        default:
            return false
    }
}
