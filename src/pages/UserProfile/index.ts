import ButtonBack from "../../components/ButtonBack"
import Profile from "../../layouts/Profile"
import Page from "../../layouts/Page"
import UserProfile from "./userProfile"
import AuthController from "../../controllers/AuthController";
import {router} from "../../index";

const buttonBack = new ButtonBack({
    link: "/messenger"
})

const profile = new Profile({
    main: new UserProfile()
})

const ProfilePage = {
    pathname: "/profile",
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

export default ProfilePage
