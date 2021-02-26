import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// ?? PrivateRoute to redirect to login with no token
const PrivateRoute = ({ component: Component, ...compProps }) => {
	return (
		<Route
			{...compProps}
			render={(props) => {
				if (localStorage.getItem('token')) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		/>
	);
};

export default PrivateRoute;
