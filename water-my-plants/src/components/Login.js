import axios from 'axios';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const initialLogIn = {
	username: '',
	password: '',
};

const StyledLogin = styled.div`
	width:60vw;
	max-width:550px;
	margin:auto;
	display:flex;
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
`

export default function LogIn() {
	const [logInData, setLogInData] = useState(initialLogIn);

	const history = useHistory();

	const inputChange = (name, value) => {
		setLogInData({ ...logInData, [name]: value });
	};

	const formSubmit = (e) => {
		// ?? login function
		axios.post(
			'https://water-my-plants-api-t199.herokuapp.com/api/auth/login',
			logInData
		)
			.then((res) => {
				console.log('login data =====> ', res);
				localStorage.setItem('token', res.data.payload);
				history.push('/plants');
			})
			.catch((err) => console.error('error logging in', err.message));
	};

	console.log('Login: logInData =====> ', logInData);

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
