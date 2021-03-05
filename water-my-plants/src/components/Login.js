import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import FormSchemaLogin from '../validation/FormSchemaLogin';

const initialLogIn = {
	username: '',
	password: '',
};

const initialFormErrors = {
	username: '',
	password: '',
};

const StyledLoginWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	padding-bottom: 50px;

	img {
		flex 0 0 auto;
		width: 170px;
		border-radius: 100px;
		margin-bottom: 20px;
	}
`;

const StyledLogin = styled.div`
	width: 60vw;
	max-width: 550px;
	margin: auto;
	display: flex;
	justify-content: center;
	align-content: space-between;
	text-align: center;

	section {
		color: #b3b5ba;
		font-size: 1.2em;
	}

	.form-group label input {
		font-size: 1.2em;
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #99c4d1;
		visibility: visible;

		&::placeholder {
			color: #b3b5ba;
		}
	}

	form .form-group label {
		display: block;
		visibility: hidden;
		margin: 10% 0;
	}
	button {
		width: 100%;
		padding: 4%;
		font-size: 1.3em;
		border: none;
		background-color: #99c4d1;
		color: white;
		font-weight: 600;
		transition: all 0.2s linear;
	}
	a button {
		border: 2px solid #99c4d1;
		background-color: white;
		color: #99c4d1;

		&:hover {
			background-color: #99c4d1;
			color: #fff;
		}
	}
	button:hover {
		cursor: pointer;
		background-color: rgba(153, 196, 209, 0.8);
	}
	button:disabled {
		cursor: initial;
		background-color: #99c4d1;
	}
	.error {
		position: absolute;
		color: #e08c8c;
		font-weight: bold;
		font-size: 0.7em;
		visibility: visible;
		text-align: left;
		margin: 5px 0 0;
	}
	h1 {
		color: #282e32;
	}
`;

export default function LogIn(props) {
	const { setIsUserLoggedIn, setUserName } = props;
	const initialDisabled = true;
	const [logInData, setLogInData] = useState(initialLogIn);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);
	const history = useHistory();

	useEffect(() => {
		FormSchemaLogin.isValid(logInData).then((isValid) =>
			setDisabled(!isValid)
		);
	}, [logInData]);

	const inputChange = (name, value) => {
		yup.reach(FormSchemaLogin, name)
			.validate(value)
			.then(() => setFormErrors({ ...formErrors, [name]: '' }))
			.catch((err) =>
				setFormErrors({ ...formErrors, [name]: err.errors[0] })
			);
		const userData = { ...logInData, [name]: value };

		setLogInData(userData);
	};

	const formSubmit = (e) => {
		// ?? login function
		axiosWithAuth()
			.post(
				'https://water-my-plants-api-t199.herokuapp.com/api/auth/login',
				logInData
			)
			.then((res) => {
				setIsUserLoggedIn(true);
				console.log('token =====> ', res.data.token);
				// ?? Set 'token' to local storage
				localStorage.setItem('token', res.data.token);
				// ?? Translate token to user data {}
				const parseJwt = (token) => {
					if (!token) {
						return;
					}
					const base64Url = token.split('.')[1];
					const base64 = base64Url
						.replace('-', '+')
						.replace('_', '/');
					return JSON.parse(window.atob(base64));
				};
				console.log('token info =====> ', parseJwt(res.data.token));
				// ?? Set 'id' to local storage
				localStorage.setItem(
					'id',
					parseJwt(res.data.token).subject
				);
				// ?? set 'user' to local storage
				localStorage.setItem(
					'user',
					parseJwt(res.data.token).username
				);
			})
			.then(() => {
				setUserName(localStorage.getItem('user'));
				history.push('/plants');
			})
			.catch((err) => console.error('error logging in', err.message));
	};

	return (
		<StyledLoginWrapper>
			<img src="plant-thumbnail.png" alt="plant" />
			<StyledLogin>
				<LoginForm
					logInData={logInData}
					inputChange={inputChange}
					formSubmit={formSubmit}
					errors={formErrors}
					disabled={disabled}
				/>
			</StyledLogin>
		</StyledLoginWrapper>
	);
}
