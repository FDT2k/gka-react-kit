/* exported Composed */
import React,{ Component } from "react";
import connect from "./connect";

export default function (Composed) {

	class AuthenticationComponent extends Component {
		constructor(props){
			super(props);
		}
		componentDidMount() {

			//debugger;
			this.props.checkSession().then(()=>{
				if (!this.props.authenticated) {
					this.props.history.push(this.props.redirectTo);
				}
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

	return connect(AuthenticationComponent);

}
