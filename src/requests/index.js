import {factory as createRequest,withState} from '../xhr/ajaxfactory';



export const admin_request_creator = ()=>{
  return {
    authenticated: createRequest(null,()=>{
      return localStorage.getItem('session')
    }),
    public:createRequest(null,null)
  }
}

export const remote_admin_request_creator = (state)=>{
  return {
    authenticated: withState(state,createRequest((s)=>{
        return  s.remote_host.url
      },
      (s)=>{
        return s.remote_auth.session;
      })
    ),
    public: withState(state,createRequest((s)=>{
        return  s.remote_host.url
      },null))

  }
}
