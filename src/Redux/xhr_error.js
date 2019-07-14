import reducerRegistry from "../Registry";

const reducerName = "xhr_error";

const createActionName = name => `app/${reducerName}/${name}`;

export const actions = {
	ADD_ERROR:createActionName("ADD_ERROR"),
};


export default function reducer(state={authenticated:false},action){
	//console.log(action);
	switch(action.type) {
		case actions.AUTHENTICATED:
			return { ...state, authenticated: true };
		case actions.UNAUTHENTICATED:
			return { ...state, authenticated: false };
		case actions.AUTHENTICATION_ERROR:
			return { ...state, authenticated: false, error: action.payload };
	}
	return state;
}


reducerRegistry.register(reducerName, reducer);


export function dispatchWithErrorHandling(request,action){
  return  async (dispatch,getState)=>{
		try {
			let result = await request();
			dispatch({
				type:action,
				payload: result.data
			})
      return Promise.resolve(result.data);
		}catch {
			dispatch({
				type: ADD_ERROR,
				payload: err
			});
			return Promise.reject(err)
		}
  }
}
