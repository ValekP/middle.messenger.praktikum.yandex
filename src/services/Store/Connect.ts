import Block from '../Block'
import Store, { StoreEvents } from './Store'
import isEqual from '../../helpers/isEqual'

export function connect (mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor (props: any = {}) {
                let state = mapStateToProps(Store.getState())
                super({ ...props, ...state })
                Store.on(StoreEvents.UPDATED, () => {
                    const newState = mapStateToProps(Store.getState())
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState })
                    }
                    state = newState
                })
            }
        }
    }
}
