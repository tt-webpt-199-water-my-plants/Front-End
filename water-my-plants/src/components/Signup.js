import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserForm from '../components/UserForm';
import styled from 'styled-components';
import * as yup from 'yup'
import FormSchemaSignUp from '../validation/FormSchemaSignUp'

const StyledSignup = styled.div`
	width:60vw;
	max-width:550px;
	margin:auto;
	display:flex;
	justify-content:center;
	align-content:space-between;
	text-align:center;
	padding-bottom: 50px;

	section {
		color:#a1a1a1;
		font-size:1.2em;
	}

	.error {
		position:absolute;
		color:#e08c8c;
		font-weight: bold;
		font-size:.7em;
		visibility:visible;
		text-align:left;
		margin:5px 0 0;
	}
`

const initialForm = {
	username: '',
	password: '',
	phoneNumber: '',
};

const initialFormErrors = {
	username: '',
	password: '',
	phoneNumber: ''
}

function Signup(props) {
	const { isUserLoggedIn } = props;
	const initialDisabled = true;
	const [form, setForm] = useState(initialForm);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	useEffect(() => {
		FormSchemaSignUp.isValid(form)
		.then(isValid => setDisabled(!isValid))
	}, [form])

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
		yup.reach(FormSchemaSignUp, name)
		  .validate(value)
			.then(() => setFormErrors({...formErrors, [name]: ''}))
			.catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
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
				errors={formErrors}
				isUserLoggedIn={isUserLoggedIn}
				disabled={disabled}
			/>
		</StyledSignup>
	);
}

export default Signup;
