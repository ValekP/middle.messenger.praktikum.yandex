import {expect} from "chai"

describe('Router', () => {
    it('Переход должен менять состояние history', () => {
        window.history.pushState({page: 'login'}, 'Login', '/login')
        window.history.pushState({page: 'register'}, 'Register', '/register')
        expect(window.history.length).to.eq(3)
    })
})
