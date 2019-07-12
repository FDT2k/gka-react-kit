// Link.react.test.js
import "babel-polyfill"
import React from 'react';
import AuthenticatedHOC,{HOC as AuthHOC} from '../src/React/HOC/AuthenticatedComponent';
import PublicHOC,{HOC as PubHOC} from '../src/React/HOC/PublicComponent';
import { Provider,connect } from 'react-redux';
global.window = {}
import 'mock-local-storage'


import renderer,{act} from 'react-test-renderer';

import createStore,{createDefaultStoreWithMiddlewares} from '../src/Store';


import ReduxThunk from 'redux-thunk';


// callback middleware for redux
const cb_test_mw = cb => store => next => action => {
  cb(action);
  next(action);
}

let store = createDefaultStoreWithMiddlewares();

class TestComponent extends React.Component {


  render() {
    return (
      <h1>test</h1>
    );
  }
}

let mock_check_session = ()=>{
  return (dispatch,getState)=>{
    dispatch({type:'check_session' }) ;
    return new Promise((resolve,reject)=>{
      resolve();
    })
  }
}

let mock_dispatch = ()=>{
  return (dispatch,getState)=>{
    dispatch({type:'dispatch' }) ;
    return new Promise((resolve,reject)=>{
      resolve();
    })
  }

}

let mock_connect = connect(null, {check_session:mock_check_session,dispatch_action:mock_dispatch});

test('PublicHOC is rendering', () => {
  return new Promise ((resolve,reject)=>{

    const C = mock_connect(PubHOC(TestComponent))
    act(()=>{


        const component = renderer.create(
          <Provider store={store}>
            <C redirectTo="bla" history={{push:()=>{resolve()}}}/>
          </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
  });
});


test('PublicHOC is dipatching', () => {
  return new Promise ((resolve,reject)=>{

    let store = createStore({auth:{authenticated:true}},[ReduxThunk,cb_test_mw((action)=>{
      console.log(action.type)
      if(action.type == 'dispatch'){
        resolve();
      }
    })]);
    const C = mock_connect(PubHOC(TestComponent,{
      history: {push:(item)=>{  }}

    }))


    act(()=>{

        const component = renderer.create(
          <Provider store={store}>
            <C dispatch={true}/>
          </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
  });

});


test('AuthenticatedHOC is rendering', () => {
  return new Promise ((resolve,reject)=>{

    const C = AuthenticatedHOC(TestComponent,{test:'testing'})
    act(()=>{

      const component = renderer.create(
        <Provider store={store}>
          <C redirectTo="bla" history={{push:()=>{ resolve() }}}/>
        </Provider>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});


test('AuthenticatedHOC is dispatching', () => {
  return new Promise ((resolve,reject)=>{
    const C = mock_connect(AuthHOC(TestComponent,{
      history: {push:(item)=>{}}
    }))
    let store = createStore({},[ReduxThunk,cb_test_mw((action)=>{
      if(action.type == 'dispatch'){
        resolve();
      }
    })]);


    act(()=>{

      const component = renderer.create(
        <Provider store={store}>
          <C redirectTo="bla" dispatch={true}
          />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
  })



});
