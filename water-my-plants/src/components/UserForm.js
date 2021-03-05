import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginSection = styled.div`
	margin-top: 50px;

	a {
		text-decoration: none;
		font-weight: bold;
		color: #99c4d1;
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
		color:#b3b5ba;
		font-size:1.2em;
	}

	.form-group label input {
		font-size:1.2em;
		width:100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #99c4d1;
		visibility:visible;

		&::placeholder {
			color: #b3b5ba;
		}
	}
	
	form .form-group label {
		display:block;
		visibility:hidden;
		margin:10% 0;
	}
	button {
		width:100%;
		padding: 4%;
		font-size: 1.5em;
		border: none;
		background-color: #99c4d1;
		color: white;
		transition: all .2s linear;
	}
	a button {
		border:2px solid #99c4d1;
		background-color:white;
		color:#99c4d1;
	}
	button:hover {
		cursor: pointer;
		background-color: rgba(153, 196, 209, .8);
		color: #fff;

		&:disabled {
			cursor: initial;
			background-color: #99c4d1;
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
