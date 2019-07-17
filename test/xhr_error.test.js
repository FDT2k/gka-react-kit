import '@babel/polyfill'
import {actions,dispatchWithErrorHandling,reducer} from '../src/Redux/xhr_error'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test ('dispatchWithErrorHandling can dispatch action',(done)=>{

  let store = mockStore({})
  const expectedActions = [
       { type: 'hello', meta:{},payload: ['blabla'] },

     ]
  return store.dispatch(dispatchWithErrorHandling(Promise.resolve({data:['blabla']}),'hello')).then(() => {
    // return of async actions
    console.log(store.getActions())
    expect(store.getActions()).toEqual(expectedActions)
  })
})

test ('dispatchWithErrorHandling can dispatch error',  ()=>{

  let store = mockStore({})
  const expectedActions = [
    { type: 'app/xhr_error/ADD_ERROR',
     payload: { message: 'nope' },
     meta: { action: 'hello' } }
   ]
   let action = dispatchWithErrorHandling(Promise.reject({message:'nope'}),'hello');

   return store.dispatch(action).then(() => {
     // return of async actions
     console.log(store.getActions())
     return Promise.reject()
   }).catch(err=>{
     console.log(err)
     expect(store.getActions()).toEqual(expectedActions)

     expect(reducer([],err)).toEqual([{message:'nope'}])

   })

})
