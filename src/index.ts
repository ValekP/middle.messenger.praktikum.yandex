import "./styles/base.scss"
import Router from "./services/Router/Router"
import Error404Page from "./pages/404"
import Error500Page from "./pages/500"
import LoginPage from "./pages/Login";

export const router = new Router("#root")

router
    .use(LoginPage)
    .use(Error404Page)
    .use(Error500Page)
    .start()
