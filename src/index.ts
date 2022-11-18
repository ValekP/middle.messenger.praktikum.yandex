import "./styles/base.scss"
import Router from "./services/Router/Router"
import Error404Page from "./pages/404"
import Error500Page from "./pages/500"

export const router = new Router("#root")

router
    .use(Error404Page)
    .use(Error500Page)
    .start()
