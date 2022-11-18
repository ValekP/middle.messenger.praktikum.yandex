import {v4 as makeUUID} from "uuid"
import Handlebars from "handlebars"
import EventBus from "./EventBus"
import isEqual from "../helpers/isEqual"

export interface BlockConstruct {
    new(props: any): Block
}

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    public _props: TProps
    private readonly _children
    private readonly _id
    public _element!: HTMLElement
    private _meta
    private _eventBus

    constructor(tag = "div", propsAndChilds: TProps = {}) {
        const {children, props} = this.getChildren(propsAndChilds)

        this._eventBus = new EventBus()
        this._id = makeUUID()
        this._children = this.makePropsProxy(children)
        this._props = this.makePropsProxy({...props, __id: this._id})
        this._meta = {tag, props}

        this.registerEvents()
        this._eventBus.emit(Block.EVENTS.INIT)
    }

    private registerEvents() {
        this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private init() {
        this._element = this.createDocumentElement(this._meta?.tag)
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
    }

    public addEvents() {
        const {events = {}} = this._props
        Object.keys(events).forEach(eventName => this._element.addEventListener(eventName, events[eventName]))
    }

    private _render() {
        const block = this.render()
        this.removeEvents()
        this._element.innerHTML = ""
        if (block !== undefined) {
            this._element.appendChild(block)
        }
        this.addEvents()
        this.addAttribute()
    }

    public render(): any {
    }

    public getContent() {
        return this._element
    }

    public removeEvents() {
        const {events = {}} = this._props
        Object.keys(events).forEach(eventName => this._element.removeEventListener(eventName, events[eventName]))
    }

    public addAttribute() {
        const {attr = {}} = this._props
        Object.entries(attr).forEach(([key, value]) => this._element.setAttribute(key, value as string))
    }

    private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const isReRender = this.componentDidUpdate(oldProps, newProps)
        if (isReRender) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
        }
    }

    public componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return isEqual(oldProps, newProps)
    }

    public compile(template: string, props?: TProps) {
        if (typeof (props) === "undefined") {
            props = this._props
        }

        const propsAndStubs = {...props}

        Object.entries(this._children).forEach(([key, child]: [string, any]) => {
            (propsAndStubs[key] as string) = `<div data-id="${child._id}"></div>`
        })

        const fragment: HTMLElement = this.createDocumentElement('template')
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

        Object.values(this._children).forEach((child) => {
            if (fragment instanceof HTMLTemplateElement) {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

                if (Array.isArray(child) && stub) {
                    const content: HTMLElement = document.createElement('div')
                    child.forEach(item => content.appendChild(item.getContent()))
                    stub.replaceWith(...content.childNodes)
                } else if (stub) {
                    stub.replaceWith(child.getContent())
                }
            }
        })

        if (fragment instanceof HTMLTemplateElement) {
            return fragment.content
        }
    }

    private getChildren(propsAndChilds: TProps) {
        const children: TProps = {}
        const props: TProps = {}

        Object.keys(propsAndChilds).forEach(key => {
            if (propsAndChilds[key] instanceof Block) {
                children[key] = propsAndChilds[key]
            } else {
                if (Array.isArray(propsAndChilds[key])) {
                    propsAndChilds[key].forEach((item: TProps) => {
                        if (item instanceof Block) {
                            children[key] = propsAndChilds[key]
                        } else {
                            props[key] = propsAndChilds[key]
                        }
                    })
                } else {
                    props[key] = propsAndChilds[key]
                }
            }
        })

        return {children, props}
    }

    private createDocumentElement(tag: string) {
        return document.createElement(tag)
    }

    public dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENTS.FLOW_CDM)
        if (Object.keys(this._children).length) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
        }
    }

    private _componentDidMount() {
        this.componentDidMount()
        Object.values(this._children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach(item => item.dispatchComponentDidMount())
            } else {
                child.dispatchComponentDidMount()
            }
        })
    }

    private componentDidMount() {
    }

    public setProps(newProps: TProps) {
        if (!newProps) {
            return
        }

        const {children, props} = this.getChildren(newProps)

        if (Object.values(children).length) {
            Object.assign(this._children, children)
        }

        if (Object.values(props).length) {
            Object.assign(this._props, props)
        }
    }

    private makePropsProxy(props: TProps) {
        return new Proxy(props, {
            get(target: TProps, prop: string) {
                const value = target[prop]
                return typeof value === "function" ? value.bind(target) : value
            },

            set: (target: TProps, prop: string, value: unknown) => {
                const oldValue = {...target}

                target[prop] = value
                this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target)
                return true
            },

            deleteProperty: () => {
                throw new Error("Нет доступа")
            },
        })
    }

    show() {
        this.getContent().style.removeProperty("display")
    }

    hide() {
        this.getContent().style.display = "none"
    }
}
