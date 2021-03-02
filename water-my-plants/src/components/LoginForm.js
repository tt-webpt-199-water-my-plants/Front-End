import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function LogInForm(props) {
	const { logInData, inputChange, formSubmit } = props;

	const history = useHistory();

	const onSubmit = (evt) => {
		evt.preventDefault();
		formSubmit();
		history.push('/plants');
	};

	const onChange = (evt) => {
		const { name, value } = evt.target;
		inputChange(name, value);
	};

	console.log('LoginForm: logInData =====> ', logInData);

	return (
		<div>
			<header>
				<h1>Log In</h1>
			</header>
			<section>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label>
							Username
							<input
								value={logInData.username}
								onChange={onChange}
								name="username"
								type="text"
								placeholder="Username"
							/>
						</label>
						<label>
							Password
							<input
								value={logInData.password}
								onChange={onChange}
								name="password"
								type="password"
								placeholder="Password"
							/>
						</label>
					</div>
					<button>Log In</button>
				</form>
				<h3>or</h3>
				<Link to="/signup">
					<button>Sign Up</button>
				</Link>
			</section>
		</div>
	);
}
