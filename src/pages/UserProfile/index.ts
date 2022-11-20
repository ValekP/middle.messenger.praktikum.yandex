import ButtonBack from "../../components/ButtonBack"
import Profile from "../../layouts/Profile"
import Page from "../../layouts/Page"
import UserProfile from "./userProfile"

const buttonBack = new ButtonBack()

const profile = new Profile({
    main: new UserProfile()
})

const ProfilePage = {
    pathname: "/profile",
    view: Page,
    props: {
        sidebar: buttonBack,
        content: profile
    }
}

export default ProfilePage
