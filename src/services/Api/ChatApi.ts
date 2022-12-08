import BaseAPI from './BaseApi'

export type TChatApiCreate = {
    title: string
}

export type TChatApiAddUser = {
    users: number[]
    chatId: number
}

export type TFindUser = {
    login: string
}

class ChatApi extends BaseAPI {
    constructor () {
        super({ path: '/chats' })
    }

    public createChat (data: TChatApiCreate) {
        return this.post('/', {
            withCredentials: true,
            data
        })
    }

    public getChat () {
        return this.get('/', {
            withCredentials: true
        })
    }

    public removeChat (chatId: number) {
        return this.delete('/', {
            withCredentials: true,
            data: { chatId }
        })
    }

    public addUserChat (data: TChatApiAddUser) {
        return this.put('/users', {
            withCredentials: true,
            data
        })
    }

    public deleteUserChat (data: TChatApiAddUser) {
        return this.delete('/users', {
            withCredentials: true,
            data
        })
    }

    public getTokenToMessagesServer (chatId: number) {
        return this.post(`/token/${chatId}`, {
            withCredentials: true
        })
    }

    public getChatUsers (chatId: number | string) {
        return this.get(`/${chatId}/users`, {
            withCredentials: true
        })
    }

    public updateAvatar (data: FormData) {
        return this.put('/avatar', {
            headers: {},
            withCredentials: true,
            data
        })
    }
}

export default new ChatApi()
