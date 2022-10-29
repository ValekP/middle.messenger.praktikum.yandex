enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

function queryStringify(data: any[]) {
    return data.map((arr) => arr.join('=')).join('&');
}

type httpOptions = {
    headers?: string;
    method?: string;
    timeout?: number;
    data?: any;
};

type httpMethod = (url: string, options?: httpOptions) => Promise<unknown>


export class HTTP {
    get: httpMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.GET});
    post: httpMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.POST});
    put: httpMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.PUT});
    delete: httpMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.DELETE});

    request = (url: string, options: httpOptions = {}) => {
        const {method, data} = options;
        if (data && method === METHODS.GET) {
            url += `?${queryStringify(data)}`
        }
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

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}