// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup'
import FormSchemaLogin from '../validation/FormSchemaLogin'


const initialLogIn = {
	username: '',
	password: '',
};

const initialFormErrors = {
	username: '',
	password: ''
  }

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
	button:hover {
		cursor: pointer;
	}
	.error {
		position:absolute;
		color:red;
		font-size:.7em;
		visibility:visible;
		text-align:left;
		margin:0;
	}
`

export default function LogIn(props) {
	const { setIsUserLoggedIn } = props;
	const [logInData, setLogInData] = useState(initialLogIn);
	const [formErrors, setFormErrors] = useState(initialFormErrors);

	const history = useHistory();

	const inputChange = (name, value) => {
		yup.reach(FormSchemaLogin, name)
		  .validate(value)
			.then(() => setFormErrors({...formErrors, [name]: ''}))
			.catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
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
				errors={formErrors}
			/>
		</StyledLogin>
	);
}
