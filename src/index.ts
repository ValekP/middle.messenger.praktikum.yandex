import "./styles/base.scss"
import Router from "./services/Router/Router"
import Error404Page from "./pages/404"
import Error500Page from "./pages/500"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/SignUp"
import ProfilePage from "./pages/UserProfile"
import ProfileEditPage from "./pages/UserProfileEdit"
import ProfilePasswordPage from "./pages/UserProfilePassword"
import ChatsPage from "./pages/Chats"
import IndexMenuPage from "./pages/IndexMenu"

export const router = new Router("#root")

router
    .use(IndexMenuPage)
    .use(LoginPage)
    .use(SignupPage)
    .use(ChatsPage)
    .use(ProfilePage)
    .use(ProfileEditPage)
    .use(ProfilePasswordPage)
    .use(Error404Page)
    .use(Error500Page)
    .start()
