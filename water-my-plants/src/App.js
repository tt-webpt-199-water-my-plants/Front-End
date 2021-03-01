import { useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect, useParams } from 'react-router-dom';
import axiosWithAuth from './utils/axiosWithAuth';
// import axios from 'axios';
import Signup from './components/Signup';
import LogIn from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import Plants from './components/Plants';
import EditProfile from './components/EditProfile';
import AddPlant from './components/AddPlant';

function App() {
	// const [userInfo, setUserInfo] = useState([]);
	// const { id } = useParams();

	// const getUserInfo = () => {
	// 	axiosWithAuth()
	// 		.get(`/auth/${id}`)
	// 		.then((res) => {
	// 			setUserInfo(res.data);
	// 		})
	// 		.catch((err) => console.error(err.message));
	// };

	// useEffect(() => {
	// 	getUserInfo();
	// }, [getUserInfo]);

	return (
		<div className="App">
			<Link to="/signup">Register</Link>
			<Link to="/login">Log In</Link>
			<Link to="/login" onClick={localStorage.removeItem('token')}>
				Log Out
			</Link>

			<Switch>
				<PrivateRoute exact path="/profile">
					<EditProfile
					// userInfo={userInfo}
					// getUserInfo={getUserInfo}
					/>
				</PrivateRoute>

				<PrivateRoute path="/plants/:id/edit"></PrivateRoute>

				<PrivateRoute path="/plants/add">
					<AddPlant />
				</PrivateRoute>

				<PrivateRoute exact path="/plants">
					<Plants />
				</PrivateRoute>

				<Route path="/login">
					<LogIn />
				</Route>

				<Route path="/signup">
					<Signup />
				</Route>

				<Route exact path="/">
					<Redirect to="/plants" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
