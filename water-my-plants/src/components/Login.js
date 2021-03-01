import axios from 'axios';
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
		setLogInData({ ...logInData, [name]: value });
	};

	const formSubmit = (e) => {
		// ?? login function
		axios.post(
			'https://water-my-plants-api-t199.herokuapp.com/api/auth/login',
			logInData
		)
			.then((res) => {
				localStorage.setItem('token', res.data.payload);
				history.push('/plants');
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
