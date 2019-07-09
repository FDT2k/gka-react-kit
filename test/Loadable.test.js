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

import Loadable from '../src/React/Loadable'

test('Loadable is rendering', (done) => {
  return new Promise ((resolve,reject)=>{
    const C = Loadable(()=>import('./TestComponent'))
    console.log(C)
    const component = renderer.create(
        <C />
    );
    setTimeout(()=>{
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      resolve();
    },1000)
  });
});
