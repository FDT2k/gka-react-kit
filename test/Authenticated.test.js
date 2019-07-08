// Link.react.test.js
import "babel-polyfill"
import React from 'react';
import AuthenticatedHOC from '../src/React/HOC/AuthenticatedComponent';
import PublicHOC from '../src/React/HOC/PublicComponent';
import { Provider } from 'react-redux';
global.window = {}
import 'mock-local-storage'


import renderer from 'react-test-renderer';

import createStore,{createDefaultStoreWithMiddlewares} from '../src/Store';


import ReduxThunk from 'redux-thunk';

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

test('PublicHOC is rendering', () => {

  const C = PublicHOC(TestComponent)
  const component = renderer.create(
    <Provider store={store}>
      <C redirectTo="bla" history={[]}/>
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});


test('PublicHOC is dipatching', () => {
  return new Promise ((resolve,reject)=>{

    let store = createStore({auth:{authenticated:true}},[ReduxThunk,cb_test_mw((action)=>{
      if(action.type == 'app/auth/UNAUTHENTICATED'){
        resolve();
      }
    })]);
    const C = PublicHOC(TestComponent)
    const component = renderer.create(
      <Provider store={store}>
        <C dispatch={true}/>
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});


test('AuthenticatedHOC is rendering', () => {

  const C = AuthenticatedHOC(TestComponent)
  const component = renderer.create(
    <Provider store={store}>
      <C redirectTo="bla" history={{push:()=>{
          console.log('ahi')
        }}}/>
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});


test('AuthenticatedHOC is dispatching', () => {
  return new Promise ((resolve,reject)=>{
    const C = AuthenticatedHOC(TestComponent)
    let store = createStore({},[ReduxThunk,cb_test_mw((action)=>{
      if(action.type == 'app/auth/UNAUTHENTICATED'){
        resolve();
      }
    })]);

    const component = renderer.create(
      <Provider store={store}>
        <C redirectTo="bla" dispatch={true}
        />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })


});
