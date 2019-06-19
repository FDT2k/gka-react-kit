import axios from 'axios';
import Promise from 'bluebird';
import _ from 'lodash';

export const ROOT_URL= API_URL;
export const getAPIUrl=(urlpart)=>{
  return `${ROOT_URL}${urlpart}`;
}

export const _createRequest=  (host,key,state,urlpart)=>{
  //debugger;
  const url = getAPIUrl(urlpart);
  console.log('called _createRequest with ',host,key,urlpart,state)
  if(_.isNil(host)){
    host = API_URL;
  }else if (!_.isNil(host)){
    if(_.isFunction(host)){
      host = host(state)
    }else{
      host = host;
    }
  }
  let axios_opts = {
    baseURL: host,
    timeout: 3000
  }
  if(typeof(key)!="undefined"){
    if(_.isFunction(key)){
      axios_opts.headers={'x-api-auth':key(state)}
    }else{
      axios_opts.headers={'x-api-auth':key}
    }
  }
  return axios.create(axios_opts);
}

//retrocompatiblity with existing actions
export const createRequest = _createRequest.bind(null,undefined,undefined);

export function dispatchWithErrorHandling(request,action){
  return  (dispatch)=>{
     return request.then((res)=>{
       dispatch({ type: action,payload:res });
       return res
     }).catch(err=>{
       dispatch({
         type: ADD_ERROR,
         payload: err
       });
       return Promise.reject(err)
     });

  }
}
