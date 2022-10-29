import {v4 as makeUUID} from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

type TEvents = Record<string, Record<string, () => void>>;

export default class Block<Props extends {}> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public _props: Props;
    private readonly _children;
    private readonly _id;
    public _element!: HTMLElement;
    private _meta;
    private _eventBus;

    constructor(tag = "div", propsAndChilds: Record<string, any> = {}) {

        const {children, props} = this.getChildren(propsAndChilds);

        this._eventBus = new EventBus();
        this._id = makeUUID();
        this._children = this.makePropsProxy(children);
        this._props = this.makePropsProxy({...props, __id: this._id});
        this._meta = {tag, props};

        this.registerEvents();
        this._eventBus.emit(Block.EVENTS.INIT);
    };

    private registerEvents() {
        this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };

    private init() {
        this._element = this.createDocumentElement(this._meta?.tag)
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    };

    public addEvents() {
        const {events = {}} = this._props as TEvents;
        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    };

    private _render(): void {
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        if (block !== undefined) {
            this._element.appendChild(block);
        }
        this.addEvents();
        this.addAttribute();
    };

    public render(): any {
    };


    public getContent() {
        return this._element;
    };

    public removeEvents() {
        const {events = {}} = this._props as TEvents;
        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    };

    public addAttribute() {
        const {attr = {}} = this._props as TEvents;
        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value as unknown as string);
        });
    };

    public componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        return true;
    };

    private getChildren<T>(propsAndChilds: Record<string, any>) {
        const children: Record<string, T> = {};
        const props: Record<string, T> = {};

        Object.keys(propsAndChilds).forEach(key => {
            if (propsAndChilds[key] instanceof Block) {
                children[key] = propsAndChilds[key];
            } else {
                props[key] = propsAndChilds[key];
            }
        });

        return {children, props};
    };

    public compile(template: string, props?: Record<string, any>) {
        if (typeof (props) === 'undefined') {
            props = this._props;
        }

        const propsAndStubs = {...props};

        Object.entries(this._children).forEach(([key, child]: [any, any]) => {
            (propsAndStubs[key] as string) = `<div data-id="${child._id}"></div>`;
        });

        const fragment: HTMLElement = this.createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach((child: any) => {
            if (fragment instanceof HTMLTemplateElement) {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            }
        });

        if (fragment instanceof HTMLTemplateElement) {
            return fragment.content;
        }
    };

    private createDocumentElement(tag: string) {
        return document.createElement(tag);
    };

    private componentDidMount() {
    };

    public dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        if (Object.keys(this._children).length) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    };

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach((child: any) => child.dispatchComponentDidMount());
    };

    private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);
        if (isReRender) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    };

    public setProps(newProps: Record<string, any>) {
        if (!newProps) {
            return;
        }

        const {children, props} = this.getChildren(newProps);

        if (Object.values(children).length) {
            Object.assign(this._children, children);
        }

        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }
    };


    private makePropsProxy(props: any): any {

        return new Proxy(props, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },

            set: (target: Record<string, unknown>, prop: string, value: unknown) => {
                const oldValue = {...target};

                target[prop] = value;
                this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target);
                return true;
            },

            deleteProperty: () => {
                throw new Error('Нет доступа');
            },

        });
    };

    show() {
        this.getContent().style.display = "block";
    };

    hide() {
        this.getContent().style.display = "none";
    };
};
