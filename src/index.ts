import './styles/base.scss'
import renderDOM from "./utils/renderDOM";

import LoginAuth from "./pages/Login";
import IndexMenu from "./pages/IndexMenu";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import SignupAuth from "./pages/Signup";


const menu = new IndexMenu({
    nav:{
        login: {
            title: "Login",
            page: LoginAuth
        },
        signup: {
            title: "Signup",
            page: SignupAuth
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
})


renderDOM('#root', menu)
