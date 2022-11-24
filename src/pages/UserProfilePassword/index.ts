import ButtonBack from "../../components/ButtonBack"
import Profile from "../../layouts/Profile"
import Page from "../../layouts/Page"
import UserProfilePassword from "./userProfilePassword"
import AuthController from "../../controllers/AuthController";
import {router} from "../../index";

const buttonBack = new ButtonBack({
    link: "/profile"
})

const profile = new Profile({
    main: new UserProfilePassword()
})

const ProfilePasswordPage = {
    pathname: "/profile/password",
    view: Page,
    props: {
        sidebar: buttonBack,
        content: profile,
        mountFn: () => {
            AuthController.checkAuth().catch(() => {
                router.go("/login")
            })
        }
    }
}

export default ProfilePasswordPage
