import renderDOM from "../../utils/renderDOM"
import Block, {BlockConstruct} from "../Block"
import Actions from "../Store/Actions"


export class Route {
    _pathname: string
    readonly _blockClass: BlockConstruct
    private _block: Block | null
    private readonly _props: TProps
    private readonly _isAuthFn: () => void
    private readonly _isNotAuthFn: () => void

    constructor(
        pathname: TPathname,
        view: BlockConstruct,
        isAuthFn = () => {
        },
        isNotAuthFn = () => {
        },
        props = {}
    ) {
        this._pathname = pathname
        this._blockClass = view
        this._block = null
        this._props = props
        this._isAuthFn = isAuthFn
        this._isNotAuthFn = isNotAuthFn
    }

    public navigate(pathname: TPathname) {
        if (this.match(pathname)) {
            this._pathname = pathname
            this.render()
        }
    }

    public leave() {
        if (this._block) {
            this._block.hide()
        }
    }

    public match(pathname: TPathname) {
        return pathname == this._pathname
    }

    public render() {
        const {id} = Actions.getProfileState()

        if (id) {
            this._isAuthFn()
        } else {
            this._isNotAuthFn()
        }

        if (!this._block) {
            this._block = new this._blockClass(this._props)
            renderDOM(this._props.rootQuery, this._block)
            this._block.componentDidMount()
            return
        }

        this._block.show()
    }
}
