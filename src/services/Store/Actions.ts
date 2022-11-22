import Store from "./Store"
import {TProfile} from "../../pages/UserProfile/userProfile"

class Actions {
    public setProfile(profile: TProfile) {
        Store.set("profile", profile)
    }

    public getProfileState() {
        const state = Store.getState()
        const profile: TProfile = state.profile ?? {}
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
