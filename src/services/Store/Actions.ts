import Store from "./Store"
import {IProfile} from "../../pages/UserProfile/userProfile"

class Actions {
    public setProfile(profile: IProfile) {
        Store.set("profile", profile)
    }

    public getProfileState() {
        const state = Store.getState()
        const profile: IProfile = state.profile ?? {}

        return Object.assign(
            {
                profile:
                    {
                        id: null,
                        first_name: '',
                        second_name: '',
                        display_name: null,
                        login: '',
                        email: '',
                        phone: '',
                        avatar: null,
                    }
            },
            profile
        )
    }
}

export default new Actions()
