import { connect } from "react-redux";

import {authenticate,check_session,logout} from "../../../Redux/authentication";

const mapStateToProps = (state)=>({
  authenticated:state.auth.authenticated
});

const mapDispatchToProps = { authenticate, check_session, dispatch_action:logout};

export default connect(mapStateToProps, mapDispatchToProps);
