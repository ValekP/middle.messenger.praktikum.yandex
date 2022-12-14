import Block from '../../services/Block'
import Input from '../../components/Input'
import ProfilePhoto from '../../components/Profile/Photo'
import Link from '../../components/Link'
import { connectProfile } from '../../services/Store/ConnectComponents'
import AuthController from '../../controllers/AuthController'
import { router } from '../../index'
import ProfileController from '../../controllers/ProfileController'
import { webpath } from '../../webpath'

export type TProfile = {
    id?: number
    first_name: string
    second_name: string
    display_name: string | null
    login: string
    email: string
    phone: string
    avatar?: string | null
}

const inputFields: Indexed = {
    email: new Input({
        template: 'profile',
        staticTmpl: true,
        type: 'email',
        name: 'email',
        label: 'Почта'
    }),
    login: new Input({
        template: 'profile',
        staticTmpl: true,
        type: 'text',
        name: 'login',
        label: 'Логин'
    }),
    first_name: new Input({
        template: 'profile',
        staticTmpl: true,
        type: 'text',
        name: 'first_name',
        label: 'Имя'
    }),
    second_name: new Input({
        template: 'profile',
        staticTmpl: true,
        type: 'text',
        name: 'second_name',
        label: 'Фамилия'
    }),
    display_name: new Input({
        template: 'profile',
        staticTmpl: true,
        type: 'text',
        name: 'display_name',
        label: 'Имя в чате'
    }),
    phone: new Input({
        template: 'profile',
        staticTmpl: true,
        type: 'number',
        name: 'phone',
        label: 'Телефон'
    })
}

const userPhoto = new ProfilePhoto()

class UserProfile extends Block {
    constructor () {
        super('div',
            {
                attr: {
                    class: 'profile'
                },
                userPhoto,
                userName: '',
                ...inputFields,
                footer: [
                    new Link({
                        title: 'Изменить данные',
                        href: webpath.profileEdit
                    }),
                    new Link({
                        title: 'Изменить пароль',
                        href: webpath.profilePassword
                    }),
                    new Link({
                        title: 'Выйти',
                        href: '/logout',
                        onClick: async (e) => {
                            e.preventDefault()
                            await AuthController.signOut().then(() => {
                                router.go(webpath.login)
                            })
                        },
                        classes: 'link--red'
                    })
                ]
            }
        )
    }

    componentDidMount () {
        ProfileController.updateProfileProps(inputFields)
        ProfileController.updateProfilePhoto(userPhoto)
    }

    render () {
        return this.compile(`
            {{{ userPhoto }}}
            <div class="profile__name">{{ userName }}</div>
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

export default connectProfile(UserProfile)
