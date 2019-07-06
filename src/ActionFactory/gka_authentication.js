/* global localStorage*/
const factory = (request_creator, actions, store_key ="session")=>{
	// actions
	const register=(values)=>{
		return async (dispatch,getState) => {

			var request = request_creator(getState()).public().post("user/register/",values);
			return {
				type: actions.REGISTER,
				payload: request
			};
		};
	};


	const reset_password=()=>{
		return async (dispatch,getState) => {

			var request = request_creator(getState()).public().post("user/reset_password",{});
			return {
				type: actions.RESET_PASSWORD,
				payload: request
			};
		};
	};

	const authenticate=(values)=>{
		const {email,password} = values;
		//dispatch new action depending on the result
		return async (dispatch,getState) => {
			try {
				const res = await request_creator(getState()).public().post("/user/authenticate",{email,password});
				localStorage.setItem(store_key, res.data.session);
				dispatch({ type: actions.AUTHENTICATED, payload:res.data.session });
				return res;

			} catch(error) {
				localStorage.removeItem(store_key);
				dispatch({
					type: actions.AUTHENTICATION_ERROR,
					payload: "Invalid email or password"
				});
				return Promise.reject(error);
			}
		};

	};


	const  logout=()=>{
		return async (dispatch) => {
			localStorage.removeItem(store_key);

			dispatch({
				type: actions.UNAUTHENTICATED,
				payload: "User logged out"
			});
		};
	};

	const check_session=()=>{

		return async (dispatch,getState) => {
			try {
				var res = await  request_creator(getState()).authenticated().get("/user/current");
				dispatch({ type: actions.AUTHENTICATED});
				return res;

			} catch(error) {



				localStorage.removeItem(store_key);

				dispatch({
					type: actions.AUTHENTICATION_ERROR,
					payload: "Invalid session"
				});
				return Promise.reject(error);
			}
		};
	};



	return { register,reset_password,authenticate, logout, check_session};

};

export default factory;
