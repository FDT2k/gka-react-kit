/*global API_URL*/

import axios from "axios";
import _ from "lodash";

export const _createRequest=  (host,key,state)=>{
	//debugger;
//	console.log("called _createRequest with ",host,key,urlpart,state);
	let _host = host;
	if(_.isNil(host)){
		_host = process.env.GKA_API_URL;
	}else if (!_.isNil(host)){
		if(_.isFunction(host)){
			_host = host(state);
		}else{
			_host = host;
		}
	}
	let axios_opts = {
		baseURL: _host,
		timeout: 3000
	};
	if(typeof(key)!="undefined"){
		if(_.isFunction(key)){
			axios_opts.headers={"x-api-auth":key(state)};
		}else{
			axios_opts.headers={"x-api-auth":key};
		}
	}
	return axios.create(axios_opts);
};

//retrocompatiblity with existing actions
export const createRequest = _createRequest.bind(null,undefined,undefined);
