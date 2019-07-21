// Link.react.test.js
import "@babel/polyfill"
import React from 'react';
import { Provider } from 'react-redux';
// test setup with JSDOM
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>',{ pretendToBeVisual: true });
const { window,Event } = jsdom;

global.window = window;
global.document = window.document;

import {mount} from 'enzyme';

import renderer,{act} from 'react-test-renderer';

class TestComponent extends React.Component {

  componentDidMount(){
    this.props.onVisibilityChange(this.onVisibilityChange.bind(this))
  }

  onVisibilityChange(hidden){
    console.log('visibility changed ',hidden)
  }

  render() {
    return (
      <React.Fragment>

        {this.props.hidden.toString()}
      </React.Fragment>
    );
  }
}

import VisibilityComponent from '../src/React/HOC/Visibility'


test('VisibilityComponent is rendering', (done) => {

    const C = VisibilityComponent(TestComponent)


    act(()=>{
      const component = renderer.create(
          <C />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

});


test('VisibilityComponent is rendering', (done) => {
  const spy = jest.spyOn(TestComponent.prototype, "onVisibilityChange");

  const map = {};

  //hack to be able to switch visiblitiy
  let _hidden = false;
  Object.defineProperty(document, "hidden", {
    configurable: true,
    get: function() { return _hidden; },
    set: function(hidden) { _hidden=hidden }
  });

  // catch listeners
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  const C = VisibilityComponent(TestComponent)

  const component  = mount(<C/>);

  //ensuring that children receive hidden props and event register
  expect(Object.keys (component.children().props())).toEqual(['hidden','onVisibilityChange'])


  expect(Object.keys(map)).toHaveLength(1)
  expect(component.text()).toBe('false')
  expect(component.state()).toEqual({hidden:false})
  expect(component.children().props().hidden).toBe(false)


  //simulate visibilty change
  document.hidden = true;
  map.visibilitychange();
  component.update()

  expect(spy).toHaveBeenCalledTimes(2)
  expect(component.state()).toEqual({hidden:true})
  expect(component.text()).toBe('true')


});
