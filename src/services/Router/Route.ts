import renderDOM from "../../utils/renderDOM"
import Block, {BlockConstruct} from "../Block"

export class Route {
    _pathname: string
    readonly _blockClass: BlockConstruct
    private _block: Block | null
    private readonly _props: TProps

    constructor(pathname: TPathname, view: BlockConstruct, props = {}) {
        this._pathname = pathname
        this._blockClass = view
        this._block = null
        this._props = props

    }

    public navigate(pathname: TPathname) {
        if (this.match(pathname)) {
            this._pathname = pathname
            this.render()
        }
    }

    public leave() {
        this._block = null
    }

    public match(pathname: TPathname) {
        return pathname == this._pathname
    }

    public render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props)

            renderDOM(this._props.rootQuery, this._block)
            this._block.componentDidMount()

            return
        }

        //this._block.show()
    }
}
