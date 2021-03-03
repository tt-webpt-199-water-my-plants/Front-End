// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const initialLogIn = {
	username: '',
	password: '',
};

const StyledLogin = styled.div`
	width: 60vw;
	max-width: 550px;
	margin: auto;
	display: flex;
	justify-content: center;
	align-content: space-between;
	text-align: center;

	section {
		color: #a1a1a1;
		font-size: 1.2em;
	}

	.form-group label input {
		font-size: 1.2em;
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #a1a1a1;
		visibility: visible;
	}

	form .form-group label {
		display: block;
		visibility: hidden;
		margin: 10% 0;
	}
	button {
		width: 100%;
		padding: 4%;
		font-size: 1.5em;
		border: none;
		background-color: #a1a1a1;
		color: white;
	}
	a button {
		border: 2px solid #a1a1a1;
		background-color: white;
		color: #a1a1a1;
	}
	button:hover {
		cursor: pointer;
	}
`;

export default function LogIn(props) {
	const { setIsUserLoggedIn, setUserName } = props;
	const [logInData, setLogInData] = useState(initialLogIn);

	const history = useHistory();

	const inputChange = (name, value) => {
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
		<StyledLogin>
			<LoginForm
				logInData={logInData}
				inputChange={inputChange}
				formSubmit={formSubmit}
			/>
		</StyledLogin>
	);
}
