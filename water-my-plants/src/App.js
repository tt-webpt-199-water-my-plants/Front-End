import { Route, Switch, Link } from 'react-router-dom';
import Signup from './components/Signup';
import LogIn from './components/Login';
import PrivateRoute from './utils/PrivateRoute';

function App() {
	return (
		<div className="App">
			<Link to="/signup">Register</Link>
			<Link to="/login">Log In</Link>
			<Link to="/login" onClick={localStorage.removeItem('token')}>
				Log Out
			</Link>

			<Switch>
				<PrivateRoute exact path="/profile"></PrivateRoute>

				<Route path="/plants/:id/edit"></Route>

				<Route path="/plants/add"></Route>

				<PrivateRoute exact path="/plants"></PrivateRoute>

				<Route path="/login">
					<LogIn />
				</Route>

				<Route path="/signup">
					<Signup />
				</Route>

				<Route exact path="/"></Route>
			</Switch>
		</div>
	);
}

export default App;
