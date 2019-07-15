import reducerRegistry from "../Registry";

const reducerName = "xhr_error";

const createActionName = name => `app/${reducerName}/${name}`;

export const actions = {
	ADD_ERROR:createActionName("ADD_ERROR"),
};


export default function reducer(state=[],action){
	//console.log(action);
	switch(action.type) {
		case actions.ADD_ERROR:
      return [...state,action.payload]
	}
	return state;
}


reducerRegistry.register(reducerName, reducer);


export function dispatchWithErrorHandling(request,action){
  return  async (dispatch,getState)=>{
		try {
			let result = await request;
			dispatch({
				type:action,
				payload: result.data
			})
      return Promise.resolve(result.data);
		}catch (error) {
			dispatch({
				type: actions.ADD_ERROR,
				payload: error
			});
			return Promise.reject(error)
		}
  }
}
