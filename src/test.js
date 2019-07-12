let _ = require('lodash')
let axios = require('axios')
var util = require('util');
 util.inspect(console);
let localStorage = {
  getItem:(r)=>{
    return 'bwou'
  }
}

const create_axios_request =  (host,headers={},timeout=3000,state={})=>{


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



function createRequest(host,auth_key){
	return _createRequest.bind(null,host,auth_key);
}


function redux_compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const compose = (...functions) => data =>{

  return functions.reduceRight((value, func) => {

    return func(value)
  }, data)
}




function request_factory(host,auth_key){
	return _createRequest.bind(null,host,auth_key);
}

/*
function withState(state){
	//debugger;
	return function (_next_factory){
		return _next_factory(state);
	};
}*/


const request_creator = (state)=>{
//  console.log(state)
	return ()=>({
		authenticated: createRequest(null,()=>{
		//	return localStorage.getItem(state._app.session_store_key);
		}),
		public:createRequest(null,null)
	});
};
/*

const authenticated = (settings)=>{
  console.log('authenticated', settings)
  settings.host = 'lol.com';

}
*/


let state ={'coucou':'monde',_app:'test'}


const a = settings => ({...settings,'a':true})
const b = settings => ({...settings,'b':true})
const c = settings => ({...settings,'c':true})


const final = settings=>{console.log(settings)}

const res = compose(a,b,c);

console.log(res)
console.log(res(final))


console.log('redux')
const res2 = redux_compose(a,b,c);
console.log(res2)
console.log(res2(final))

console.log('native')
console.log(a(b(c(final))))



const withState = state=> (settings)=>({...settings,state})

const authenticated = (settings)=> ({...settings,host:(state)=>(state.host)})


 let test = redux_compose(a,c,withState({'host':'prout.com'}),authenticated);
console.log(test)
console.log(test(final))



/*let res = withState(state)(authenticated)
*/


//console.log(util.inspect(res, showHidden=true, depth=2, colorize=true))

//console.log(compose(withState({'coucou':'monde',_app:'test'}),authenticated)())
