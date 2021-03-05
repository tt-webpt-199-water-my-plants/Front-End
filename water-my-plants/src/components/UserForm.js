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

const StyledUserForm = styled.div`
	width:60vw;
	max-width:550px;
	margin:auto;
	display:flex;
	flex-wrap:wrap;
	justify-content:center;
	align-content:space-between;
	text-align:center;

	section {
		color:#a1a1a1;
		font-size:1.2em;
	}

	.form-group label input {
		font-size:1.2em;
		width:100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #a1a1a1;
		visibility:visible;
	}
	
	form .form-group label {
		display:block;
		visibility:hidden;
		margin:10% 0;
	}
	button {
		width:100%;
		padding: 4%;
		font-size:1.5em;
		border:none;
		background-color:#a1a1a1;
		color:white;
	}
	a button {
		border:2px solid #a1a1a1;
		background-color:white;
		color:#a1a1a1;
	}
	button:hover {
		cursor: pointer;

		&:disabled {
			cursor: initial;
		}
	}
`;

function UserForm(props) {
	const { form, handleChange, handleSubmit, buttonText, errors, isUserLoggedIn, disabled } = props;
	return (
		<StyledUserForm>
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
								<p className='error'>{errors.username}</p>
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
								<p className='error'>{errors.password}</p>
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
								<p className='error'>{errors.phoneNumber}</p>
							</label>
						</div>
						<button disabled={disabled}>{buttonText}</button>
					</form>
				</section>
			</div>
			{
				!isUserLoggedIn &&
				<StyledLoginSection>
				<p>Already have an account?</p>
				<p>
					<Link to="/login">Log In</Link>
				</p>
				</StyledLoginSection>
			}
		</StyledUserForm>
	);
}

export default UserForm;
