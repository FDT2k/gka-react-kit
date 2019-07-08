/*
Higher Order Component that redirect if user is not authenticated
*/

import React,{ Component } from "react";
import PropTypes from 'prop-types';

export default (Composed) =>{

	class AuthenticationComponent extends Component {
		constructor(props){
			super(props);
		}
		componentDidMount() {

			//debugger;
			this.props.check_session().then(()=>{
				if (!this.props.authenticated) {
					this.props.history.push(this.props.redirectTo);
				}
			}).catch(()=>{
        //Err
      });
		}

		componentDidUpdate(prevProps) {
			//debugger;
			if (!this.props.authenticated) {
				this.props.history.push(this.props.redirectTo);
			}
		}


		render() {
			return <Composed {...this.props} />;
		}
	}


  AuthenticationComponent.propTypes = {
    "redirectTo": PropTypes.string.isRequired,
  	"history": PropTypes.any.isRequired,
  };
	return AuthenticationComponent;
}
