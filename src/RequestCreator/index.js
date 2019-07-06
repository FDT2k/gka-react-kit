/*global localStorage*/
import {factory as createRequest,withState} from "../xhr/ajaxfactory";


// create a request depending on the given state
export const request_creator = (store_key = "session")=>{
	return {
		authenticated: createRequest(null,()=>{
			return localStorage.getItem(store_key);
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
