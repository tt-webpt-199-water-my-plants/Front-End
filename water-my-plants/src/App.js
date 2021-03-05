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
	width: 100%;
	justify-content: center;
	padding: 10px;
	box-sizing: border-box;

	.container {
		width: 100%;
		max-width: 1000px;
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		>div {
			display: flex;
			align-items: center;
		}
	}

	a {
		text-decoration: none;
		padding: 5px 10px;
		color: #99c4d1;
		font-weight: 600;
	}

	.divider {
		margin-left: 10px;
		font-size: 1.1rem;
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
				<div className="container">
					{isUserLoggedIn && (
						<div>
							<p>Hello, {userName}!</p>
							<span className="divider"> 👋 </span>
							<Link
								to="/login"
								onClick={() => {
									clearLocalStorage();
									setPlants([]);
								}}
							>
								Log Out
							</Link>
						</div>
					)}
					{!isUserLoggedIn && <Link to="/login">Log In</Link>}
					{!isUserLoggedIn && <Link to="/signup">Sign Up</Link>}
				</div>
			</StyledTopbar>

			<Switch>
				<PrivateRoute
					exact
					path="/profile"
				>
					<EditProfile 
						isUserLoggedIn={isUserLoggedIn}
					/>
				</PrivateRoute>

				<PrivateRoute path="/plants/:id/edit">
					<EditPlant plants={plants} setPlants={setPlants} />
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
					<Signup 
						isUserLoggedIn={isUserLoggedIn}
					/>
				</Route>

				<Route exact path="/">
					<Redirect to="/plants" />
				</Route>
			</Switch>
		</StyledApp>
	);
}

export default App;
