/*
Higher Order Component that redirect if user is  authenticated

if there is a dispatch prop set to true, dispatch the connected action (dispatch_action). cf connect.js for  default action bound to gka auth if authenticated
if there is a redirectTo Prop push the value to the history prop if not authenticated
*/

import React, { Component } from 'react';

export default (ComposedComponent)=> {

  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) {

        if(typeof(this.props.redirectTo) != "undefined"){
          this.props.history.push(this.props.redirectTo);
        }

        if(this.props.dispatch === true){
          this.props.dispatch_action();
        }

      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.props.history.push(this.props.redirectTo);
      }
    }


    render() {
      return <ComposedComponent {...this.props} />;
    }
  }


  return NotAuthentication;
}
