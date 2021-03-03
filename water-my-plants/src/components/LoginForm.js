import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

export default function LogInForm(props) {
	const { logInData, inputChange, formSubmit, errors } = props;

	const onSubmit = (evt) => {
		evt.preventDefault();
		formSubmit();
	};

	const onChange = (evt) => {
		const { name, value } = evt.target;
		inputChange(name, value);
	};

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
							<p className='error'>{errors.username}</p>
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
							<p className='error'>{errors.password}</p>
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
