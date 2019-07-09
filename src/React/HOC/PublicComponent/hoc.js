/*
Higher Order Component that redirect if user is  authenticated

if there is a dispatch prop set to true, dispatch the connected action (dispatch_action). cf connect.js for  default action bound to gka auth if authenticated
if there is a redirectTo Prop push the value to the history prop if not authenticated

if there is a fallback prop defined
*/

import React, { Component } from 'react';

export default (ComposedComponent,_defaultProps)=> {
  _defaultProps = Object.assign({},{timeout:3000},_defaultProps)
  class NotAuthentication extends Component {
    constructor (props){
      super (props)
      this.state = {authenticated:false,display_fallback: false}
    }
    componentDidMount() {

      this.props.check_session()
    }

    componentDidUpdate(prevProps){
      if(!this.props.authenticated){
        this.setState({display_fallback:false})
      }

      if (!prevProps.authenticated && this.props.authenticated) {

        if(typeof(this.props.fallback) == "undefined"){

          if(typeof(this.props.redirectTo) != "undefined"){
      //      this.props.history.push(this.props.redirectTo);
          }


        }else{
          this.setState({display_fallback: true})
          setTimeout(()=>{
            this.props.history.push(this.props.redirectTo);
          },this.props.timeout);
        }
        if(this.props.dispatch === true){
          this.props.dispatch_action();
        }
      }
    }


    render() {
      return (
        <React.Fragment>
        { this.state.display_fallback && this.props.fallback}
        { !this.state.display_fallback && <ComposedComponent {...this.props} />}

        </React.Fragment>
      );
    }
  }
  NotAuthentication.defaultProps = _defaultProps


  return NotAuthentication;
}
