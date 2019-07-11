/*
Higher Order Component that redirect if user is  authenticated

if there is a dispatch prop set to true, dispatch the connected action (dispatch_action). cf connect.js for  default action bound to gka auth if authenticated
if there is a redirectTo Prop push the value to the history prop if not authenticated

if there is a fallback prop defined it is displayed for the props.timeout duration before redirect

Dispatch is always immediate
*/

import React, { Component } from 'react';

export default (ComposedComponent,_defaultProps)=> {
  _defaultProps = Object.assign({},{timeout:3000},_defaultProps)
  class NotAuthentication extends Component {
    constructor (props){
      super (props)
      this.state = {authenticated:false,display_fallback: false}
      this.timeout = null;
    }
    componentDidMount() {
      this.props.check_session().then(()=>{
        this.logic();
      })
    }

    componentDidUpdate(prevProps){
      if(!this.props.authenticated){
        this.setState({display_fallback:false})
      }
      if (!prevProps.authenticated && this.props.authenticated) {
        this.logic();
      }
    }

    logic(){
      if(typeof(this.props.history) == "undefined"){
        throw new Error('history props is not defined, this HOC is meant to be used with react-router.')
        return ;
      }

      if(typeof(this.props.fallback) == "undefined"){
        if(typeof(this.props.redirectTo) != "undefined"){
           this.props.history.push(this.props.redirectTo);
        }
      }else{
        this.setState({display_fallback: true})
        this.timeout = setTimeout(()=>{
          this.props.history.push(this.props.redirectTo);
          this.timeout = null;
        },this.props.timeout);
      }

      if(this.props.dispatch === true){
        this.props.dispatch_action();
      }

    }

    componentWillUnmount(){
      if(this.timeout !=null){
        clearTimeout(this.timeout)
      }
    }


    render() {
      const { authenticated,redirectTo,fallback,timeout,dispatch, ...passThroughProps } = this.props;

      let Fallback = fallback;
      return (

        <React.Fragment>
        { this.state.display_fallback && <Fallback {...this.props}/>}
        { !this.state.display_fallback && <ComposedComponent {...this.passThroughProps} />}

        </React.Fragment>
      );
    }
  }
  NotAuthentication.defaultProps = _defaultProps


  return NotAuthentication;
}
