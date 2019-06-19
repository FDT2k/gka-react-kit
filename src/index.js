
import createStore from './store'
import ReduxThunk from 'redux-thunk';


let store = createStore({},[ReduxThunk]);


import reducerRegistry from './registry';

console.log(reducerRegistry._reducers)
