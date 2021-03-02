import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Signup from './components/Signup';
import LogIn from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import Plants from './components/Plants';
import EditProfile from './components/EditProfile';
import AddPlant from './components/AddPlant';

function App() {
	const clearLocalStorage = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('id');
	};

	return (
		<div className="App">
			<Link to="/signup">Register</Link>
			<Link to="/login">Log In</Link>
			<Link
				to="/login"
				onClick={() => {
					clearLocalStorage();
				}}
			>
				Log Out
			</Link>
			<p>Hello, {localStorage.getItem('user')}</p>

			<Switch>
				<PrivateRoute
					exact
					path="/profile"
					component={EditProfile}
				/>

				<PrivateRoute path="/plants/:id/edit"></PrivateRoute>

				<PrivateRoute path="/plants/add" component={AddPlant} />

				<PrivateRoute exact path="/plants" component={Plants} />

				<Route path="/login" component={LogIn} />

				<Route path="/signup" component={Signup} />

				<Route exact path="/">
					<Redirect to="/plants" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
