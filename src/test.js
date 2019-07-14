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


const create_axios_from_settings = (settings)=>{
		return create_axios_request(settings.host,settings.headers,settings.timeout,settings.state);
}

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

const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe);


let state ={'coucou':'monde',_app:'test'}


const a = settings => ({...settings,'a':true})
const b = settings => ({...settings,'b':true})
const c = settings => ({...settings,'c':true})


const final = settings=>{ return (settings)=>{

  console.log(settings)
  debugger;
  return create_axios_request();
}}

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

const request_creator = settings=> {  return create_axios_from_settings(settings)}

 let test = redux_compose(a,c,withState({'host':'prout.com'}),authenticated);
console.log('composite', test)
console.log('dafuk',test(request_creator))


let request_creator_auth = pipe(a,c,withState({host:'test.com'}),authenticated,request_creator);
debugger;
console.log('piping',request_creator_auth().get('helloworld').then(res=>{
  console.log(res.data)
}))


/*let res = withState(state)(authenticated)
*/


//console.log(util.inspect(res, showHidden=true, depth=2, colorize=true))

//console.log(compose(withState({'coucou':'monde',_app:'test'}),authenticated)())
