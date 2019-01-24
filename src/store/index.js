import Store from './stores'

export default class StoreIndex {
    constructor() {
        this.store = new Store(this)
    }

    routerFunc() {
        return (
            {
                store: this.store,
            }
        )
    }


};