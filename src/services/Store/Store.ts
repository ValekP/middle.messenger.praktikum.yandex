import EventBus from "../EventBus"

export type TState = Record<string, any>

export enum StoreEvents {
    UPDATED = "updated"
}

class Store extends EventBus {
    private _state: TState = {}
    private readonly _STORE_NAME: string
    static _instance: Store

    constructor() {
        if (Store._instance) {
            return Store._instance
        }
        super()
        this._STORE_NAME = "messengerStore"
        const savedState = window.localStorage.getItem(this._STORE_NAME)
        this._state = savedState ? (JSON.parse(savedState) ?? {}) : {}
        this.on(`${StoreEvents.UPDATED}`, () => {
            window.localStorage.setItem(this._STORE_NAME, JSON.stringify(this._state))
        })
    }

    getState() {
        return this._state
    }

    removeState() {
        console.log(this._state)
        this._state = {}
        console.log(this._state)
        this.emit(`${StoreEvents.UPDATED}`)
    }

    set(id: string, value: unknown) {
        this._state[id] = value
        this.emit(`${StoreEvents.UPDATED}`)
        return this
    }
}

export default new Store()
