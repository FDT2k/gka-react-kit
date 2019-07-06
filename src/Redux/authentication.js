import reducerRegistry from '../Registry'

import {request_creator as createRequest} from '../RequestCreator'

const reducerName = 'auth';

const createActionName = name => `app/${reducerName}/${name}`;

export const actions = {
  REGISTER:createActionName('REGISTER'),
  AUTHENTICATED :createActionName('AUTHENTICATED'),
  UNAUTHENTICATED :createActionName('UNAUTHENTICATED'),
  AUTHENTICATION_ERROR :createActionName('AUTHENTICATION_ERROR'),
  RESET_PASSWORD :createActionName('RESET_PASSWORD')
}


export default function reducer(state={authenticated:false},action){
  //console.log(action);
  switch(action.type) {
    case actions.AUTHENTICATED:
      return { ...state, authenticated: true };
    break;
    case actions.UNAUTHENTICATED:
      return { ...state, authenticated: false };
    break;
    case actions.AUTHENTICATION_ERROR:
      return { ...state, authenticated: false, error: action.payload };
      break;
  }
  return state;
}


reducerRegistry.register(reducerName, reducer);


// define actions
export const {register,reset_password,authenticate, logout, check_session} = factory(request_creator,actions)
