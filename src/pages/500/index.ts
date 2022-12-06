import ErrorPage from "../../layouts/Error"
import {webpath} from "../../webpath"

const Error500Page = {
    pathname: webpath.error500,
    view: ErrorPage,
    props: {
        statusCode: 500,
        statusDescription: "Мы уже фиксим",
    }
}

export default Error500Page
