/*global localStorage*/
import {factory as createRequest,withState} from "../xhr/ajaxfactory";


// create a request depending on the given state
export const request_creator = (state)=>{
	return {
		authenticated: createRequest(null,()=>{
			return localStorage.getItem(state._app.session_store_key);
		}),
		public:createRequest(null,null)
	};
};

export const remote_admin_request_creator = (state)=>{
	return {
		authenticated: withState(state,createRequest((s)=>{
			return s.remote_host.url;
		},
		(s)=>{
			return s.remote_auth.session;
		})
		),
		public: withState(state,createRequest((s)=>{
			return  s.remote_host.url;
		},null))

	};
};
