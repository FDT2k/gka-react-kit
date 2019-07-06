import React, { Component } from 'react';
import connect from './connect';

export default function (Composed) {

  class AuthenticationComponent extends Component {
    constructor(props){
      super(props);
    }
    componentWillMount() {

      //debugger;
      this.props.checkSession().then(()=>{
        if (!this.props.authenticated) {
          this.props.history.push(this.props.redirectTo);
        }
      });
    }

    componentWillUpdate(nextProps) {
      //debugger;
      if (!nextProps.authenticated) {
        this.props.history.push(this.props.redirectTo);
      }
    }


    render() {
      return <Composed {...this.props} />;
    }
  }

  return connect(AuthenticationComponent)

}
