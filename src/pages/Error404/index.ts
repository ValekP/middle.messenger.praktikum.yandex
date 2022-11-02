import ErrorPage from "../../layouts/Error";

const Error404 = new ErrorPage({
    statusCode: 404,
    statusDescription: 'Не туда попали',
})

export default Error404
