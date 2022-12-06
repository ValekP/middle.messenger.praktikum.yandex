import queryStringify from "../helpers/queryStringify"

enum Methods {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE"
}

type HttpOptions = {
    headers?: object
    method?: Methods
    timeout?: number
    data?: object
    withCredentials?: boolean
}

type HttpMethods = (url: string, options?: HttpOptions) => Promise<any>

export class HTTPTransport {
    get: HttpMethods = (url, options = {}) => {
        url = options.data ? url + "?" + queryStringify(options.data) : url
        return this.request(url, {...options, method: Methods.GET})
    }

    post: HttpMethods = (url, options = {}) => {
        return this.request(url, {...options, method: Methods.POST})
    }

    put: HttpMethods = (url, options = {}) => {
        return this.request(url, {...options, method: Methods.PUT})
    }

    delete: HttpMethods = (url, options = {}) => {
        return this.request(url, {...options, method: Methods.DELETE})
    }

    request = (url: string, options: HttpOptions) => {
        const {
            method = Methods.GET,
            headers = {},
            data,
            timeout = 10000,
            withCredentials = false,
        } = options

        return new Promise((resolve, reject) => {
            const xhr = new window.XMLHttpRequest()

            xhr.open(method, url)

            if (withCredentials) {
                xhr.withCredentials = true
            }

            Object.entries(headers).forEach(([key, value]) =>
                xhr.setRequestHeader(key, value)
            )

            xhr.onload = () => {
                if (xhr.status >= 300) {
                    reject(xhr)
                } else {
                    resolve(xhr)
                }
            }

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.timeout = timeout
            xhr.ontimeout = reject

            if (method === Methods.GET || !data) {
                xhr.send()
            } else if (data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
}
