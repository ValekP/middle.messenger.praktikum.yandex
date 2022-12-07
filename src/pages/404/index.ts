import ErrorPage from '../../layouts/Error'
import { webpath } from '../../webpath'

const Error404Page = {
    pathname: webpath.error404,
    view: ErrorPage,
    props: {
        statusCode: 404,
        statusDescription: 'Не туда попали'
    }
}

export default Error404Page
