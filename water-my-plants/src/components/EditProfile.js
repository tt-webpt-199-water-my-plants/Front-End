import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Navigation from './Navigation';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import FormSchemaEditProfile from '../validation/FormSchemaEditProfile';
import { Base64 } from 'js-base64';

const StyledEditProfile = styled.div`
	text-align: center;
	padding-bottom: 150px;

	h1 {
		display: none;
	}
	.error {
		position: absolute;
		color: #e08c8c;
		font-weight: bold;
		font-size: 0.7em;
		visibility: visible;
		text-align: left;
		margin: 5px 0 0;
	}
`;

function EditProfile(props) {
	const userId = localStorage.getItem('id');

	const initialForm = {
		username: '',
		password: '',
		phoneNumber: '',
	};

	const initialFormErrors = {
		username: '',
		password: '',
		phoneNumber: '',
	};

	const { isUserLoggedIn } = props;
	const initialDisabled = true;
	const [form, setForm] = useState(initialForm);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	useEffect(() => {
		FormSchemaEditProfile.isValid(form).then((isValid) =>
			setDisabled(!isValid)
		);
	}, [form]);

	const history = useHistory();

	const update = (name, value) => {
		setForm({ ...form, [name]: value });
	};

	useEffect(() => {
		// ?? get user data and update form state with user's username, password, and phone number
		axiosWithAuth()
			.get(`/auth`)
			.then((res) => {
				const currentUser = res.data.filter(
					(user) => user.id === Number(userId)
				);
				console.log('currentUser =====> ', currentUser[0]);
				setForm({
					// ...form,
					username: currentUser[0].username,
					password: 'Enter new password',
					phoneNumber: currentUser[0].phoneNumber,
				});
			})
			.catch((err) =>
				console.error(`unable to get user data`, err.message)
			);
	}, [userId]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		yup.reach(FormSchemaEditProfile, name)
			.validate(value)
			.then(() => setFormErrors({ ...formErrors, [name]: '' }))
			.catch((err) =>
				setFormErrors({ ...formErrors, [name]: err.errors[0] })
			);
		update(name, value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submit();
	};

	const newUserData = {
		username: form.username,
		password: form.password,
		phoneNumber: form.phoneNumber,
		id: localStorage.getItem('id'),
	};

	const submit = () => {
		// ?? use axios to post put/update data for the current user
		axiosWithAuth()
			.put(
				`/auth/edit-user/${localStorage.getItem('id')}`,
				newUserData
			)
			.then((res) => {
				history.push('/plants');
			})
			.catch((err) =>
				console.error('unable to update user ', err.message)
			);
	};

	console.log('form data: EditUser.js =====> ', form);

	return (
		<StyledEditProfile>
			<h2>Edit Profile</h2>
			<UserForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				buttonText="Submit"
				errors={formErrors}
				isUserLoggedIn={isUserLoggedIn}
				disabled={disabled}
			/>
			<Navigation />
		</StyledEditProfile>
	);
}

export default EditProfile;
