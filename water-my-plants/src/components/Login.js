// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';

const initialLogIn = {
	username: '',
	password: '',
};

export default function LogIn() {
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
				console.log('token =====> ', res.data.token);
				localStorage.setItem('token', res.data.token);

				// history.push('/plants');
			})
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
