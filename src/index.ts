import './styles/base.scss'
import renderDOM from "./utils/renderDOM";
import ErrorPage404 from "./pages/ErrorPage404";
import ErrorPage500 from "./pages/ErrorPage500";
import LoginAuth from "./pages/Login";



renderDOM('#root', LoginAuth)
