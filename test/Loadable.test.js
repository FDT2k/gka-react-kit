// Link.react.test.js
import "@babel/polyfill"
import React from 'react';
import { Provider } from 'react-redux';
global.window = {}
import 'mock-local-storage'


import renderer from 'react-test-renderer';

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
