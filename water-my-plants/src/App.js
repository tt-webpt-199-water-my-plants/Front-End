import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import LogIn from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import Plants from './components/Plants';
import EditProfile from './components/EditProfile';
import AddPlant from './components/AddPlant';

function App() {
	return (
		<div className="App">
			<Link to="/signup">Register</Link>
			<Link to="/login">Log In</Link>
			<Link to="/login" onClick={localStorage.removeItem('token')}>
				Log Out
			</Link>

			<Switch>
				<PrivateRoute exact path="/profile">
					<EditProfile />
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
