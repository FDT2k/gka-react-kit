// Link.react.test.js
import "babel-polyfill"
import React from 'react';
import AuthenticatedHOC from '../src/React/HOC/AuthenticatedComponent';
import PublicHOC from '../src/React/HOC/PublicComponent';
import { Provider } from 'react-redux';
global.window = {}
import 'mock-local-storage'
//window.localStorage = global.localStorage



import renderer from 'react-test-renderer';

import {createDefaultStoreWithMiddlewares} from '../src/Store';

let store = createDefaultStoreWithMiddlewares();

class TestComponent extends React.Component {


  render() {
    return (
      <h1>test</h1>
    );
  }
}

test('Component is rendering', () => {

  const C = PublicHOC(TestComponent)
  const component = renderer.create(
    <Provider store={store}>
      <C redirectTo="bla" history={[]}/>
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

test('Component is rendering', () => {

  const C = AuthenticatedHOC(TestComponent)
  const component = renderer.create(
    <Provider store={store}>
      <C redirectTo="bla" history={[]}/>
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
