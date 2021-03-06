// data/reducerRegistry.js

export class ReducerRegistry {
	constructor() {
		this._emitChange = null;
		this._reducers = {};
	}

	getReducers() {
		return { ...this._reducers };
	}

	register(name, reducer) {
		this._reducers = { ...this._reducers, [name]: reducer };
		if (this._emitChange) {
			this._emitChange(this.getReducers());
		}
	}

	setChangeListener(listener) {
		this._emitChange = listener;
	}
}

const reducerRegistry = new ReducerRegistry();

//add an initial reducer redux seems to not like to not have at least one.
reducerRegistry.register("_app",(state={session_store_key:'session'})=>{return state;});

export default reducerRegistry;
