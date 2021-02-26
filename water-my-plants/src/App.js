import { Route, Switch, Link } from 'react-router-dom';
import Signup from './components/Signup';
import LogIn from './components/Login';

function App() {
	return (
		<div className="App">
			<Link to="/signup">Register</Link>
			<Link to="/login">Log In</Link>

			<Switch>
				<Route path="/profile"></Route>

				<Route path="/plants/:id/edit"></Route>

				<Route path="/plants/add"></Route>

				<Route path="/plants"></Route>

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
