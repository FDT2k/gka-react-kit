/*HOC that redirects if the user is authenticated*/

import React, { Component } from 'react';

export default (ComposedComponent)=> {

  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        this.props.history.push(this.props.redirectTo);
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
