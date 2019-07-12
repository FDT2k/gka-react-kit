
import axios from "axios";
import _ from "lodash";



export const create_axios_request =  (host,headers={},timeout=3000,state={})=>{


	if(_.isNil(host)){
		host = process.env.GKA_API_URL;
	}else if (!_.isNil(host)){
		if(_.isFunction(host)){
			host = host(state);
		}
	}
	let axios_opts = {
		baseURL: host,
		timeout: timeout
	};

	if(typeof(headers)!="undefined"){
		if(_.isFunction(headers)){
			axios_opts.headers= headers(state)
		}else{
			axios_opts.headers= headers;
		}
	}
	return axios.create(axios_opts);
};

const create_axios_from_settings = (settings)=>{
		return create_axios_request(settings.host,settings.headers,settings.timeout,settings.state);
}


//retrocompatiblity with existing actions
export const createRequest = create_axios_request.bind(null,undefined,undefined,undefined);
