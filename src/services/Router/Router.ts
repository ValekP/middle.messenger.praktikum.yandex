import {Route} from "./Route"
import {BlockConstruct} from "../Block"

interface RouterProps {
    pathname: TPathname,
    view: BlockConstruct,
    props?: TProps
}

export default class Router {
    static __instance: Router
    protected routes: Route[]
    protected history: History
    protected _currentRoute: Route | null
    protected _rootQuery: string

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }

        this.routes = []
        this._currentRoute = null
        this._rootQuery = rootQuery
        this.history = window.history

        Router.__instance = this
    }

    private _onRoute(pathname: TPathname) {
        const route = this.getRoute(pathname)

        if (!route) {
            this.go("/404")
            return
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }

        console.log(pathname)

        this._currentRoute = route
        route.render()
    }

    public use({pathname, view, props = {}}: RouterProps) {
        const route = new Route(pathname, view, {...props, rootQuery: this._rootQuery})
        this.routes.push(route)
        return this
    }

    public start() {
        window.onpopstate = (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname)
        }
        this._onRoute(window.location.pathname)
    }

    public go(pathname: TPathname) {
        this.history.pushState({}, "", pathname)
        this._onRoute(pathname)
    }

    public back() {
        this.history.back()
    }

    public forward() {
        this.history.forward()
    }

    public getRoute(pathname: TPathname) {
        return this.routes.find((route) => route.match(pathname)) as Route
    }
}

export {Router}
