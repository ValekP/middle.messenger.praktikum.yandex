import ButtonBack from "../../components/ButtonBack"
import Profile from "../../layouts/Profile"
import Page from "../../layouts/Page"
import UserProfilePassword from "./userProfilePassword"
import {checkNotAuth} from "../../controllers/AuthActions"

const buttonBack = new ButtonBack()

const profile = new Profile({
    main: new UserProfilePassword()
})

const ProfilePasswordPage = {
    pathname: "/profile/password",
    view: Page,
    props: {
        sidebar: buttonBack,
        content: profile,
        mountFn: checkNotAuth
    }
}

export default ProfilePasswordPage
