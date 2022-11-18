import ButtonBack from "../../components/ButtonBack"
import Profile from "../../layouts/Profile"
import Page from "../../layouts/Page"
import {UserProfileEdit} from "./userProfileEdit"

const buttonBack = new ButtonBack()

const profile = new Profile({
    main: new UserProfileEdit()
})

const ProfileEditPage = {
    pathname: "/profile/edit",
    view: Page,
    props: {
        sidebar: buttonBack,
        content: profile
    }
}

export default ProfileEditPage
