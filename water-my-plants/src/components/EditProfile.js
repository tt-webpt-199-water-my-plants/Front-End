import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Navigation from './Navigation';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup'
import FormSchemaEditProfile from '../validation/FormSchemaEditProfile'

const StyledEditProfile = styled.div`
	text-align: center;
	padding-bottom: 150px;

	h1 {
		display: none;
	}
	.error {
		position:absolute;
		color:red;
		font-size:.7em;
		visibility:visible;
		text-align:left;
		margin:0;
	}
`;

const initialForm = {
	username: '',
	password: '',
	phoneNumber: '',
};


const initialFormErrors = {
	username: '',
	password: '',
	phoneNumber: ''
  };

function EditProfile() {
	const [form, setForm] = useState(initialForm);
	const [formTwo, setFormTwo] = useState([]);
	const [formErrors, setFormErrors] = useState(initialFormErrors);

	const history = useHistory();

	const update = (name, value) => {
		setForm({ ...form, [name]: value });
	};

	useEffect(() => {
		// ?? get user data and update form state with user's username, password, and phone number
		axiosWithAuth()
			.get(`/auth`)
			.then((res) => {
				setForm(res.data);
				setFormTwo(res.data);
			})
			.catch((err) =>
				console.error(`unable to get user data`, err.message)
			);
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		yup.reach(FormSchemaEditProfile, name)
		  .validate(value)
			.then(() => setFormErrors({...formErrors, [name]: ''}))
			.catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
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

	console.log('newUserData =====> ', newUserData);
	console.log('form =====> ', form);
	console.log('formTwo =====> ', formTwo);

	const submit = () => {
		// ?? use axios to post put/update data for the current user
		axiosWithAuth()
			.put(
				`/auth/edit-user/${localStorage.getItem('id')}`,
				newUserData
			)
			.then((res) => {
				history.push('/');
			})
			.catch((err) =>
				console.error('unable to update user ', err.message)
			);
	};

	const formFilter = formTwo.filter(
		(user) => user.id == localStorage.getItem('id')
	);

	const currentUserData = formFilter[0];

	console.log('formFilter =====> ', formFilter);
	console.log('currentUserData =====> ', currentUserData);

	return (
		<StyledEditProfile>
			<h2>Edit Profile</h2>
			<UserForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				buttonText="Submit"
				errors={formErrors}
			/>
			<Navigation />
		</StyledEditProfile>
	);
}

export default EditProfile;
