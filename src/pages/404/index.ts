import ErrorPage from "../../layouts/Error"

const Error404Page = {
    pathname: "/404",
    view: ErrorPage,
    props: {
        statusCode: 404,
        statusDescription: "Не туда попали",
    }
}

export default Error404Page
