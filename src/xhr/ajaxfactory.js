//old way, should disappear
import {create_axios_request as _createRequest} from  "./ajax";

export function factory(host,auth_key){
	return _createRequest.bind(null,host,auth_key);
}


export function withState(state,_factory){
	//debugger;
	return function (){
		return _factory(state);
	};
}
