import { Route } from './Route'
import { BlockConstruct } from '../Block'
import { router } from '../../index'
import { webpath } from '../../webpath'

interface RouterProps {
    pathname: TPathname
    view: BlockConstruct
    props?: TProps
    isAuthFn?: () => void
    isNotAuthFn?: () => void
}

export default class Router {
    static __instance: Router
    protected routes: Route[]
    protected history: History
    protected _currentRoute: Route | null
    protected _rootQuery: string

    constructor (rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }

        this.routes = []
        this._currentRoute = null
        this._rootQuery = rootQuery
        this.history = window.history

        Router.__instance = this
    }

    public use ({
        pathname,
        view,
        props = {}
    }: RouterProps) {
        const route = new Route(pathname, view, {
            ...props,
            rootQuery: this._rootQuery
        })
        this.routes.push(route)
        return this
    }

    public start () {
        window.onpopstate = (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname)
        }
        this._onRoute(window.location.pathname)
    }

    public go (pathname: TPathname) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    public back () {
        this.history.back()
    }

    public forward () {
        this.history.forward()
    }

    public getRoute (pathname: TPathname) {
        return this.routes.find((route) => route.match(pathname)) as Route
    }

    private _onRoute (pathname: TPathname) {
        const route = this.getRoute(pathname)

        if (!route) {
            router.go(webpath.error404)
            return
        }

        if (this._currentRoute) {
            this._currentRoute.leave()
        }

        this._currentRoute = route
        route.render()
    }
}

export { Router }
