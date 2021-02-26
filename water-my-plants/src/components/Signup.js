import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserForm from '../components/UserForm';

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
				console.log('returned data from post =====> ', res.data);
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
		<div>
			<h2>Sign Up</h2>
			<UserForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				buttonText="Sign Up"
			/>
			<div>
				<p>Already have an account?</p>
				<p>
					<Link to="/login">Log In</Link>
				</p>
			</div>
		</div>
	);
}

export default Signup;
