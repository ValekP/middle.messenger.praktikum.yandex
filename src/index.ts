import './styles/base.scss'
import renderDOM from "./utils/renderDOM";
import IndexMenu from "./pages/IndexMenu";
import LoginAuth from "./pages/Login";
import SignupAuth from "./pages/Signup";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import ChatsPage from "./pages/Chats";
import UserProfile from "./pages/UserProfile";


const nav = {
    login: {
        title: "Login",
        page: LoginAuth
    },
    signup: {
        title: "Signup",
        page: SignupAuth
    },
    chats: {
        title: "Chats",
        page: ChatsPage,
    },
    profile: {
        title: "Profile",
        page: UserProfile,
    },
    page404: {
        title: "404",
        page: Error404
    },
    page500: {
        title: "500",
        page: Error500
    }
}

// @ts-ignore
const root = window.location.pathname.slice(1) in nav ? nav[window.location.pathname.slice(1)].page : new IndexMenu({nav})

renderDOM('#root', root)

