/*

export function fetchSubjects(){
  return async (dispatch,getState) => {
  //  var request = createRequest().get('subjects');
    let res = await request_creator(getState()).authenticated().get("subjects",{});
    dispatch({
      type:FETCH_SUBJECTS,
      payload:res.data
    })
  }
}

request_creator(getState())(authenticated(get('subjects')))
*/

export function dispatch(options){
  /*
    options = {
      error_type: ADD_ERROR,
      success_action_type:FETCH_SUBJECTS
      request_creator: request_creator(getState).authenticated().post('')
      throw_error: false

    }
  */
  return (dispatch,getState)=>{


  }
}

export function dispatchWithErrorHandling(request,action){
  return  (dispatch,getState)=>{
     return request.then((res)=>{
       return dispatch({ type: action,payload:res });
     }).catch(err=>{
       return dispatch({
         type: ADD_ERROR,
         payload: err
       });
     });

  }
}
