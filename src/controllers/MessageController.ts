import Actions from '../services/Store/Actions'
import { TChatMessages } from '../components/Conversation/Message/message'
import formatDate from '../helpers/formatDate'
import { chatsSidebar, conversation } from '../pages/Chats'

export type TMessageWebSocketConnect = {
    userId: number
    chatId: number
    token: string
}

export type TMessageWebSocketGet = {
    offset: number
}

class MessageController {
    private _ws!: WebSocket
    private _userId!: number
    private _chatId!: number
    private _token!: string
    private _ping: any

    constructor () {
        this._handleOpen = this._handleOpen.bind(this)
        this._handleMassage = this._handleMassage.bind(this)
        this._handleClose = this._handleClose.bind(this)
    }

    public connect (options: TMessageWebSocketConnect) {
        this.leave()
        this._userId = options.userId
        this._chatId = options.chatId
        this._token = options.token

        this._ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${options.userId}/${options.chatId}/${options.token}`)
        this._addEvents()
    }

    public getMessages (options: TMessageWebSocketGet) {
        this._ws.send(JSON.stringify({
            content: options.offset.toString(),
            type: 'get old'
        }))
    }

    public leave () {
        this.clearIntervalWs()
        if (this._ws) {
            this._ws.close()
            this._removeEvents()
        }
    }

    public sendMsg (message: string) {
        this._ws.send(JSON.stringify({
            content: message,
            type: 'message'
        }))
    }

    private clearIntervalWs () {
        if (this._ping) clearInterval(this._ping)
    }

    private _addEvents () {
        this._ws.addEventListener('open', this._handleOpen)
        this._ws.addEventListener('message', this._handleMassage)
        this._ws.addEventListener('close', this._handleClose)
    }

    private _removeEvents () {
        this._ws.removeEventListener('open', this._handleOpen)
        this._ws.removeEventListener('message', this._handleMassage)
        this._ws.removeEventListener('close', this._handleClose)
    }

    private _handleOpen () {
        this.getMessages({ offset: 0 })
        this.clearIntervalWs()
        this._ping = setInterval(() => {
            const { id } = Actions.getProfileState()
            if (id) {
                this._ws.send(JSON.stringify({
                    type: 'ping'
                }))
            } else {
                this.leave()
            }
            chatsSidebar.updateChat()
        }, 3000)
    }

    private async _handleMassage (e: MessageEvent) {
        try {
            const data = JSON.parse(e.data) as TChatMessages[]
            const format = (msg: Indexed) => {
                msg.time = formatDate(new Date(Date.parse(msg.time)))
                msg.myMessage = this._userId === parseInt(msg.user_id)
                return msg
            }
            if (Array.isArray(data)) {
                data.forEach(msg => format(msg))
                Actions.setChatMessages(data)
                await conversation.updateMessages()
            } else if ('id' in data) {
                await conversation.setNewMessages(format(data) as TChatMessages)
            }
        } catch (e) {
            console.log(e)
        }
    }

    private _handleClose (e: CloseEventInit) {
        if (e.wasClean) {
            alert('Соединение закрыто')
        } else if (e.code === 1006) {
            this._reconnection()
        }
    }

    private _reconnection () {
        this.connect({
            userId: this._userId,
            chatId: this._chatId,
            token: this._token
        })
    }
}

export default new MessageController()
