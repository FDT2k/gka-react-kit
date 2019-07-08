import { connect } from "react-redux";

import {authenticate,check_session} from "../../../Redux/authentication";

const mapStateToProps = null;

const mapDispatchToProps = { authenticate, check_session};

export default connect(mapStateToProps, mapDispatchToProps);
