import {HTTPTransport} from "./HTTPTransport"

describe("HTTPTransport", () => {
    const http = new HTTPTransport()
    it("Тестовый запрос получение ip", (done) => {
        http
            .get("http://ip-api.com/json/")
            .then((r) => {
                done()
                console.log(r.response)
            })
            .catch((e) => {
                done(new Error(e.response))
            })
    })
})
