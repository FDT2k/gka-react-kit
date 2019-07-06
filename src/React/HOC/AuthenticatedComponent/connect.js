import { connect } from 'react-redux';

import {authenticate} from '../../../Redux/authentication'

const mapStateToProps = null

const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps);
