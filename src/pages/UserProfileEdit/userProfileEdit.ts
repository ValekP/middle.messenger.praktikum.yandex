import Block from "../../services/Block"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfilePhoto from "../../components/Profile/Photo"
import {connectProfile} from "../../services/Store/ConnectComponents"
import validateInputsList from "../../helpers/validateInputsList"
import Actions from "../../services/Store/Actions"
import ProfileController from "../../controllers/ProfileController"

const inputFields: Indexed = {
    email: new Input({
        template: "profile",
        staticTmpl: false,
        type: "email",
        name: "email",
        label: "Почта",
    }),
    login: new Input({
        template: "profile",
        staticTmpl: false,
        type: "text",
        name: "login",
        label: "Логин"
    }),
    first_name: new Input({
        template: "profile",
        staticTmpl: false,
        type: "text",
        name: "first_name",
        label: "Имя"
    }),
    second_name: new Input({
        template: "profile",
        staticTmpl: false,
        type: "text",
        name: "second_name",
        label: "Фамилия"
    }),
    display_name: new Input({
        template: "profile",
        staticTmpl: false,
        type: "text",
        name: "display_name",
        label: "Имя в чате"
    }),
    phone: new Input({
        template: "profile",
        staticTmpl: false,
        type: "number",
        name: "phone",
        label: "Телефон"
    })
}

const button = new Button({
    title: "Сохранить",
    onClick: async (e: Event) => {
        e.preventDefault()
        const inputs = validateInputsList(inputFields)
        if (inputs) {
            //await ProfileController.updateProfile(inputs as TProfile)
            const formDataPhoto = userPhoto.getFormDataPhoto()

            if (formDataPhoto) await ProfileController.updateAvatar(formDataPhoto)
        }
    }
})

const userPhoto = new ProfilePhoto({edit: true})

class UserProfileEdit extends Block {
    constructor() {
        super("div",
            {
                attr: {
                    class: "profile"
                },
                userPhoto,
                ...inputFields,
                footer: button,
            }
        )
    }

    preMount() {
        const state = Actions.getProfileState() as Indexed
        for (const [key] of Object.entries(inputFields)) {
            const props = {...inputFields[key]._props, value: state[key]}
            inputFields[key].setProps(props)
        }
        console.log(state)
        userPhoto.setProps({
            ...userPhoto._props,
            photo: state.avatar ? `https://ya-praktikum.tech/api/v2/resources${state.avatar}` : null
        })
    }

    render() {
        return this.compile(`
            {{{ userPhoto }}}
            <div class="profile__fields-list">
                {{{ email }}}
                {{{ login }}}
                {{{ first_name }}}
                {{{ second_name }}}
                {{{ display_name }}}
                {{{ phone }}}
            </div>
            <div class="profile__footer">
                {{{ footer }}}
            </div>
        `)
    }
}

export default connectProfile(UserProfileEdit)
