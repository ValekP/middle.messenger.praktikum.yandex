import queryStringify from "../helpers/queryStringify";

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}


type HttpOptions = {
    headers?: string;
    method?: string;
    timeout?: number;
    data?: any;
};

type HttpMethod = (url: string, options?: HttpOptions) => Promise<unknown>


export class HTTP {
    get: HttpMethod = (url, options = {}) => this.request(options.data ? `${url}?${queryStringify(options.data)}` : url, {
        ...options,
        method: Methods.GET
    });
    post: HttpMethod = (url, options = {}) => this.request(url, {...options, method: Methods.POST});
    put: HttpMethod = (url, options = {}) => this.request(url, {...options, method: Methods.PUT});
    delete: HttpMethod = (url, options = {}) => this.request(url, {...options, method: Methods.DELETE});

    request = (url: string, options: HttpOptions = {}) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject();
                return
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === Methods.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}
