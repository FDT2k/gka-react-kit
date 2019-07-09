/* exported Composed */
import React,{ Component } from "react";

import {compose} from 'redux';
import withAuth from './hoc'
import connect from "./connect";

const enhance = compose(
	connect,
	withAuth,
)
// same as connect(withAuth(arg))
export const HOC  = withAuth;

export default enhance;
//export default withAuth


// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
