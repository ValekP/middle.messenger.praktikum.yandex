import ErrorPage from "../../components/ErrorPage";

const Error404 = new ErrorPage({
    statusCode: 404,
    statusDescription: 'Не туда попали',
})

export default Error404
