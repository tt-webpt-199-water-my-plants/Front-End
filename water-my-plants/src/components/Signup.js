import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserForm from '../components/UserForm';
import styled from 'styled-components';

const StyledSignup = styled.div`
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
`

const initialForm = {
	username: '',
	password: '',
	phoneNumber: '',
};

function Signup() {
	const [form, setForm] = useState(initialForm);

	const history = useHistory();

	const update = (name, value) => {
		setForm({ ...form, [name]: value });
	};

	const submit = () => {
		// ?? use axios to post form data to create a new user
		axios.post(
			'https://water-my-plants-api-t199.herokuapp.com/api/auth/register',
			form
		)
			.then((res) => {
				console.log('returned data from post =====> ', res);
				history.push('/login');
			})
			.catch((err) =>
				console.error('unable to register', err.message)
			);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		update(name, value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submit();
	};

	return (
		<StyledSignup>
			<UserForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				buttonText="Sign Up"
			/>
		</StyledSignup>
	);
}

export default Signup;
