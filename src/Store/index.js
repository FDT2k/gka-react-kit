

import { combineReducers, createStore,applyMiddleware } from "redux";
import reducerRegistry from "../Registry";


export const createDefaultStoreWithMiddlewares= ()=>{

	//redux middlewares
	let ReduxPromise = require('redux-promise');
	let ReduxThunk = require('redux-thunk');

	let reduxMiddlewares = [];

	if (process.env.NODE_ENV === 'dev') {
	 const { logger } = require('redux-logger');
	 reduxMiddlewares.push(logger);
	}

	reduxMiddlewares.push(ReduxThunk);
	reduxMiddlewares.push(ReduxPromise);

	return factory({},reduxMiddlewares)

}


const factory = (initialState={},middlewares=[])=>{

	// Preserve initial state for not-yet-loaded reducers
	const combine = (reducers) => {
		const reducerNames = Object.keys(reducers);
		Object.keys(initialState).forEach(item => {
			if (reducerNames.indexOf(item) === -1) {
				reducers[item] = (state = null) => state;
			}
		});
		return combineReducers(reducers);
	};


	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

	const reducer = combine(reducerRegistry.getReducers());
	const store = createStoreWithMiddleware(reducer,initialState);

	// Replace the store's reducer whenever a new reducer is registered.
	reducerRegistry.setChangeListener(reducers => {
		store.replaceReducer(combine(reducers));
	});

	return store;
};

export default factory;
