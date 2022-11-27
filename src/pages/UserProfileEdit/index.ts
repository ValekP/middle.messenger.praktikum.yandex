import ButtonBack from "../../components/ButtonBack"
import Profile from "../../layouts/Profile"
import Page from "../../layouts/Page"
import UserProfileEdit from "./userProfileEdit"
import AuthController from "../../controllers/AuthController"
import {router} from "../../index"
import {webpath} from "../../webpath"

const buttonBack = new ButtonBack({
    link: webpath.profile
})

const profile = new Profile({
    main: new UserProfileEdit()
})

const ProfileEditPage = {
    pathname: "/profile/edit",
    view: Page,
    props: {
        sidebar: buttonBack,
        content: profile,
        mountFn: () => {
            AuthController.checkAuth().catch(() => {
                router.go(webpath.login)
            })
        }
    }
}

export default ProfileEditPage
