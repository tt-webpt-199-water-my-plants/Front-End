import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginSection = styled.div`
	margin-top: 50px;

	a {
		text-decoration: none;
		font-weight: bold;
		color: #777;
	}
`;

function UserForm(props) {
	const { form, handleChange, handleSubmit, buttonText } = props;
	return (
		<div>
			<header>
				<h1>Sign Up</h1>
			</header>
			<section>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>
							Username
							<input
								type="text"
								name="username"
								value={form.username}
								onChange={handleChange}
								placeholder="Username"
							/>
						</label>
					</div>
					<div className="form-group">
						<label>
							Password 
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								placeholder="Password"
							/>
						</label>
					</div>
					<div className="form-group">
						<label>
							Phone Number 
							<input
								type="tel"
								name="phoneNumber"
								value={form.phoneNumber}
								onChange={handleChange}
								placeholder="Phone Number"
							/>
						</label>
					</div>
					<button>{buttonText}</button>
				</form>
			</section>
			<StyledLoginSection>
				<p>Already have an account?</p>
				<p>
					<Link to="/login">Log In</Link>
				</p>
			</StyledLoginSection>
		</div>
	);
}

export default UserForm;
