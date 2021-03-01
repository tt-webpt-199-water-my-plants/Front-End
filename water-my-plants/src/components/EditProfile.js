import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Navigation from './Navigation';
// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useParams, useHistory } from 'react-router-dom';

const initialForm = {
	id: Date.now(),
	username: '',
	password: '',
	phoneNumber: '',
};

function EditProfile(props) {
	const [form, setForm] = useState(initialForm);

	const { id } = useParams();
	const history = useHistory();

	const update = (name, value) => {
		setForm({ ...form, [name]: value });
	};

	useEffect(() => {
		// ?? get user data and update form state with user's username, password, and phone number
		// axios
		axiosWithAuth()
			.get(`/auth/${id}`)
			.then((res) => {
				setForm(res.data);
			})
			.catch((err) =>
				console.error(`unable to get user data`, err.message)
			);
	}, [id]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		update(name, value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submit();
	};

	const newUserData = {
		...form,
		username: form.username,
		password: form.password,
		phoneNumber: form.phoneNumber,
	};

	const submit = () => {
		// ?? use axios to post put/update data for the current user
		// axios
		axiosWithAuth()
			.put(`/auth/edit-user/${id}`, newUserData)
			.then((res) => {
				props.getUserInfo();
				history.push('/');
			})
			.catch((err) =>
				console.error('unable to update user ', err.message)
			);
	};

	return (
		<div>
			<h2>Edit Profile</h2>
			<UserForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				buttonText="Submit"
			/>
			<Navigation />
		</div>
	);
}

export default EditProfile;
