import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Navigation from './Navigation';
// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useParams, useHistory } from 'react-router-dom';
// import useForm from '../custom hooks/useForm';

const initialForm = {
	// id: Date.now(),
	username: '',
	password: '',
	phoneNumber: '',
};

function EditProfile(props) {
	const [form, setForm] = useState(initialForm);
	const [newForm, setNewForm] = useState([]);
	// const [values, handleChanges, clearForm] = useForm(initialForm);

	console.log('Edit Profile props =====> ', props);

	const { id } = useParams();
	const history = useHistory();

	console.log('id =====> ', props.id);

	const update = (name, value) => {
		setForm({ ...form, [name]: value });
	};

	useEffect(() => {
		// ?? get user data and update form state with user's username, password, and phone number
		// axios
		axiosWithAuth()
			.get(`/auth`)
			.then((res) => {
				setForm(res.data);
			})
			.then((res) => {
				const formFilter = Object.filter(
					form,
					(id) => id === localStorage.getItem('id')
				);
				setNewForm(formFilter);
			})
			.catch((err) =>
				console.error(`unable to get user data`, err.message)
			);
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		update(name, value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submit();
	};

	const newUserData = {
		...newForm,
		username: newForm.username,
		password: newForm.password,
		phoneNumber: newForm.phoneNumber,
	};

	const submit = () => {
		// ?? use axios to post put/update data for the current user
		// axios
		axiosWithAuth()
			.put(
				`/auth/edit-user/${localStorage.getItem('id')}`,
				newUserData
			)
			.then((res) => {
				// props.getUserInfo();
				history.push('/');
				// clearForm();
			})
			.catch((err) =>
				console.error('unable to update user ', err.message)
			);
	};

	console.log('newUserData =====> ', newUserData);

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
