/* exported Composed */
import React,{ Component } from "react";

import {compose} from 'redux';
import withAuth from './hoc'
import connect from "./connect";

const enhance = compose(
	connect,
	withAuth,
)

export const HOC  = withAuth;

export default enhance;
//export default withAuth
