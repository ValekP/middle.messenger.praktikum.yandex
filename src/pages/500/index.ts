import ErrorPage from "../../layouts/Error"

const Error500Page = {
    pathname: "/500",
    view: ErrorPage,
    props: {
        statusCode: 500,
        statusDescription: "Мы уже фиксим",
    }
}

export default Error500Page
