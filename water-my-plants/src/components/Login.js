// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
// import { useHistory } from 'react-router-dom';

const initialLogIn = {
	username: '',
	password: '',
};

export default function LogIn() {
	const [logInData, setLogInData] = useState(initialLogIn);

	// const history = useHistory();

	const inputChange = (name, value) => {
		const userData = { ...logInData, [name]: value };

		setLogInData(userData);
	};

	const formSubmit = (e) => {
		// e.preventDefault();
		// ?? login function
		axiosWithAuth()
			.post(
				'https://water-my-plants-api-t199.herokuapp.com/api/auth/login',
				logInData
			)
			.then((res) => {
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
			// .then((res) => {

			// })
			//* .then(() => {
			//* 	history.push('/plants');
			//* })
			.catch((err) => console.error('error logging in', err.message));
	};

	console.log('Login: logInData =====> ', logInData);

	return (
		<div className="wrapper">
			<LoginForm
				logInData={logInData}
				inputChange={inputChange}
				formSubmit={formSubmit}
			/>
		</div>
	);
}
