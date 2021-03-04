import React, { useState } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import LogIn from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import Plants from './components/Plants';
import EditProfile from './components/EditProfile';
import AddPlant from './components/AddPlant';
import EditPlant from './components/EditPlant';
import styled from 'styled-components';

const StyledTopbar = styled.div`
	display: flex;
	padding: 10px;

	a {
		text-decoration: none;
		padding: 5px 10px;
		color: #777;
	}
`;

const StyledApp = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	flex-flow: column nowrap;
`;

function App() {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(
		localStorage.getItem('id') ? true : false
	);

	// const userName = () => {
	// 	return localStorage.getItem('user');
	// };
	const [userName, setUserName] = useState([]);

	const [plants, setPlants] = useState([]);

	const clearLocalStorage = () => {
		localStorage.clear();
		setIsUserLoggedIn(false);
	};

	return (
		<StyledApp className="App">
			<StyledTopbar>
				{isUserLoggedIn && (
					<div>
						<p>Hello, {userName}!</p>
						<Link
							to="/login"
							onClick={() => {
								clearLocalStorage();
							}}
						>
							Log Out
						</Link>
					</div>
				)}
				{!isUserLoggedIn && <Link to="/login">Log In</Link>}
				{!isUserLoggedIn && <Link to="/signup">Register</Link>}
			</StyledTopbar>

			<Switch>
				<PrivateRoute
					exact
					path="/profile"
				>
					<EditProfile />
				</PrivateRoute>

				<PrivateRoute path="/plants/:id/edit">
					<EditPlant />
				</PrivateRoute>

				<PrivateRoute path="/plants/add">
					<AddPlant plants={plants} setPlants={setPlants} />
				</PrivateRoute>

				<PrivateRoute exact path="/plants">
					<Plants plants={plants} setPlants={setPlants} />
				</PrivateRoute>

				<Route path="/login">
					<LogIn
						setIsUserLoggedIn={setIsUserLoggedIn}
						setUserName={setUserName}
					/>
				</Route>

				<Route path="/signup">
					<Signup />
				</Route>

				<Route exact path="/">
					<Redirect to="/plants" />
				</Route>
			</Switch>
		</StyledApp>
	);
}

export default App;
