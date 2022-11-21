import {HTTPTransport} from "../../utils/HTTPTransport"
import isArray from "../../helpers/isArray"
import isObject from "../../helpers/isObject"

type BaseApiProps = {
    path: string
}

export default abstract class BaseAPI {
    private _http: HTTPTransport
    private readonly _url: string
    private readonly _path: string
    private _headers: Record<string, string>

    constructor(props: BaseApiProps) {
        this._http = new HTTPTransport()
        this._url = "https://ya-praktikum.tech/api/v2"
        this._path = props.path
        this._headers = {
            "Content-type": "application/json",
            "accept": "application/json"
        }
    }

    async get(path: string, options?: {}) {
        return this._http.get(this.getUrl() + path, this.setDefaultOptions(options)).then(this.response)
    }

    async post(path: string, options?: {}) {
        return this._http.post(this.getUrl() + path, this.setDefaultOptions(options)).then(this.response)
    }

    async put(path: string, options?: {}) {
        return this._http.put(this.getUrl() + path, this.setDefaultOptions(options)).then(this.response)
    }

    async delete(path: string, options?: {}) {
        return this._http.delete(this.getUrl() + path, this.setDefaultOptions(options)).then(this.response)
    }

    private getUrl() {
        return `${this._url}${this._path}`
    }

    private setDefaultOptions(options: Record<string, any> = {}) {
        return {
            headers: this._headers,
            ...options
        }
    }

    private response(res: XMLHttpRequest) {
        if (res.response === 'OK') {
            return {ok: true}
        }

        const response = JSON.parse(res.response)

        if (response && isArray(response)) {
            return response
        }

        if (response && isObject(response)) {
            return response
        }

        return response
    }

}
