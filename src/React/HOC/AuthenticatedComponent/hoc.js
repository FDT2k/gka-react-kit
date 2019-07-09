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
			console.log(props)
			super(props);
		}
		componentDidMount() {

			//debugger;
			this.props.check_session().then(()=>{
				if (!this.props.authenticated) {
					if(typeof(this.props.redirectTo) != "undefined"){
						this.props.history.push(this.props.redirectTo);
					}

					if(this.props.dispatch === true){
						this.props.dispatch_action();

					}
				}
			}).catch((err)=>{
        //Err
				if(typeof(this.props.redirectTo) != "undefined"){
					this.props.history.push(this.props.redirectTo);
				}

				if(this.props.dispatch === true){
					this.props.dispatch_action();

				}
      });
		}

		componentDidUpdate(prevProps) {
			//debugger;
			if (!this.props.authenticated) {
				if(typeof(this.props.redirectTo) != "undefined"){
					this.props.history.push(this.props.redirectTo);
				}
				if(this.props.dispatch === true){
					this.props.dispatch_action();
				}
			}
		}

		render() {
			return <Composed {...this.props} />;
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
