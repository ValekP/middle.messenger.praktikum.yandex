type validateAuthProps = {
    name: string,
    value: string;
}

export default function validateAuth(props: validateAuthProps){
    switch (props.name){
        case "login":
            switch (true){
                case props.value.length === 0:
                    return "Поле не может быть пустым"
                case !/^[a-zA-Z0-9](?=.*[a-zA-z])[a-zA-Z0-9-_\.]{2,20}$/.test(props.value):
                    return "Логин должен быть больше 3-х символов на латинице, и не быть только из цифр (допустимы дефис и нижнее подчёркивание)"
                default:
                    return false
            }
        case "password":
            switch (true){
                case !/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/.test(props.value):
                    return "Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
                default:
                    return false
            }
        default:
            return false
    }
}