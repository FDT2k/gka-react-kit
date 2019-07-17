import reducerRegistry from "../Registry";

const reducerName = "xhr_error";

const createActionName = name => `app/${reducerName}/${name}`;

export const actions = {
	ADD_ERROR:createActionName("ADD_ERROR"),
};


export function reducer(state=[],action){
	//console.log(action);
	switch(action.type) {
		case actions.ADD_ERROR:
      return [...state,action.payload]
	}
	return state;
}


reducerRegistry.register(reducerName, reducer);


export function dispatchWithErrorHandling(request,action,meta={}){
  return  async (dispatch,getState)=>{
		try {
			let result = await request;
			dispatch({
				type:action,
				payload: result.data,
				meta
			})
      return Promise.resolve(result.data);
		}catch (error) {

			let err_action = {
				type: actions.ADD_ERROR,
				payload: error,
				meta: {action,...meta}
			}
			dispatch(err_action);
			return Promise.reject(err_action)
		}
  }
}
