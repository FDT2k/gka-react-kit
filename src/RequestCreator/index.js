/*global localStorage*/
import {factory as createRequest,withState as _withState} from "../xhr/ajaxfactory";

/*composing requests for the app*/
import pipe from 'lodash/fp/flow';
import {getStore} from '../Store';
import {create_axios_from_settings} from "../xhr/ajax";

export const withState =  (settings)=>({...settings,state:getStore().getState()})

export const gka_authentication = (settings)=> ({...settings,headers:(state)=>({'x-api-auth':localStorage.getItem(state._app.session_store_key)})})

export const jwt_authentication = (settings)=> ({...settings,headers:(state)=>({'Authorization': 'Bearer ' +localStorage.getItem(state._app.session_store_key)})})

let authenticated_pipe =  pipe(
  withState,
  gka_authentication,
  create_axios_from_settings
);

export const authenticated_request = authenticated_pipe

let public_pipe =  pipe(
  withState,
  create_axios_from_settings
);
export const public_request = public_pipe;


// old stuff should disappear
// create a request depending on the given state
export const request_creator = (state)=>{
	return {
		authenticated: createRequest(null,()=>{
			return {'x-api-auth':localStorage.getItem(state._app.session_store_key)};
		}),
		public:createRequest(null,null)
	};
};

export const remote_admin_request_creator = (state)=>{
	return {
		authenticated: _withState(state,createRequest((s)=>{
			return s.remote_host.url;
		},
		(s)=>{
			return s.remote_auth.session;
		})
		),
		public: _withState(state,createRequest((s)=>{
			return  s.remote_host.url;
		},null))

	};
};
