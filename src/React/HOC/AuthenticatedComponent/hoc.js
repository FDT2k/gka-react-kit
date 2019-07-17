/*
Higher Order Component that redirect if user is not authenticated

if there is a dispatch prop set to true, dispatch the connected action (dispatch_action). cf connect.js for  default action bound to gka auth if not authenticated
if there is a redirectTo Prop push the value to the history prop if not authenticated
*/

import React,{ Component } from "react";
import PropTypes from 'prop-types';

export default (Composed,_defaultProps={}) =>{

	class AuthenticationComponent extends Component {
		constructor(props){
			super(props);
			this.state = {authenticated:true}
		}
		componentDidMount() {
			//console.log('requested check session1')

			this.props.check_session().then((res)=>{
				/*console.log('requested check session 2')

				debugger;
				if (!this.props.authenticated) {
					if(typeof(this.props.redirectTo) != "undefined"){
						this.props.history.push(this.props.redirectTo);
					}

					if(this.props.dispatch === true){
						this.props.dispatch_action();

					}
				}*/

			}).catch(()=>{
        //Err
				if(typeof(this.props.redirectTo) != "undefined"){
					this.props.history.push(this.props.redirectTo);
				}
				if(this.props.dispatch === true){
					this.props.dispatch_action();

				}
      });
		}
/*
		static getDerivedStateFromProps(props, current_state) {
			//debugger;
			if (current_state!=null && current_state.authenticated !== props.authenticated) {
				return {
					authenticated: props.authenticated
				}
			}

			return null
		}
*/
		componentDidUpdate(prevProps) {
			//debugger;

			if (prevProps.authenthicated && !this.props.authenticated) {
				if(typeof(this.props.redirectTo) != "undefined"){
					this.props.history.push(this.props.redirectTo);
				}
				if(this.props.dispatch === true){
					this.props.dispatch_action();
				}
			}
		}

		render() {
			//removing used props
			const { authenticated,redirectTo,fallback,timeout,dispatch, ...passThroughProps } = this.props;
			return <Composed {...passThroughProps} />;
		}
	}

	AuthenticationComponent.defaultProps = _defaultProps

  AuthenticationComponent.propTypes = {
    "redirectTo": PropTypes.string.isRequired,
		"history": PropTypes.any,
  	"dispatch": PropTypes.bool,
  };
	return AuthenticationComponent;
}
