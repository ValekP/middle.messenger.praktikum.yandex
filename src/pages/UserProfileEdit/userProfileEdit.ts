import Block from '../../services/Block'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ProfilePhoto from '../../components/Profile/Photo'
import { connectProfile } from '../../services/Store/ConnectComponents'
import validateInputsList from '../../helpers/validateInputsList'
import ProfileController from '../../controllers/ProfileController'
import { TProfile } from '../UserProfile/userProfile'
import { router } from '../../index'
import { webpath } from '../../webpath'

const inputFields: Indexed = {
    email: new Input({
        template: 'profile',
        staticTmpl: false,
        type: 'email',
        name: 'email',
        label: 'Почта'
    }),
    login: new Input({
        template: 'profile',
        staticTmpl: false,
        type: 'text',
        name: 'login',
        label: 'Логин'
    }),
    first_name: new Input({
        template: 'profile',
        staticTmpl: false,
        type: 'text',
        name: 'first_name',
        label: 'Имя'
    }),
    second_name: new Input({
        template: 'profile',
        staticTmpl: false,
        type: 'text',
        name: 'second_name',
        label: 'Фамилия'
    }),
    display_name: new Input({
        template: 'profile',
        staticTmpl: false,
        type: 'text',
        name: 'display_name',
        label: 'Имя в чате'
    }),
    phone: new Input({
        template: 'profile',
        staticTmpl: false,
        type: 'number',
        name: 'phone',
        label: 'Телефон'
    })
}

const button = new Button({
    title: 'Сохранить',
    type: 'submit'
})

const userPhoto = new ProfilePhoto({ edit: true })

class UserProfileEdit extends Block {
    constructor () {
        super('form',
            {
                attr: {
                    class: 'profile'
                },
                userPhoto,
                ...inputFields,
                footer: button
            }
        )
    }

    formSubmit () {
        const form = this._element?.closest('form') as HTMLFormElement
        form.onsubmit = async (e: Event) => {
            e.preventDefault()
            const inputs = validateInputsList(inputFields)
            if (inputs) {
                await ProfileController.updateProfile(inputs as TProfile)
                const formDataPhoto = userPhoto.getFormDataPhoto()
                if (formDataPhoto) await ProfileController.updateAvatar(formDataPhoto)
                await router.go(webpath.profile)
            }
        }
    }

    componentDidMount () {
        this.formSubmit()
        ProfileController.updateProfileProps(inputFields)
        ProfileController.updateProfilePhoto(userPhoto)
    }

    render () {
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
