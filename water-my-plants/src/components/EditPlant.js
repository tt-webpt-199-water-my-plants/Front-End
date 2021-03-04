import React, { useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';
import PlantForm from './PlantForm';
import axiosWithAuth from '../utils/axiosWithAuth';

const StyledEditPlant = styled.section`
	width: 60vw;
	max-width: 550px;
	margin: auto;
	text-align: center;
	padding-bottom: 150px;

	h1 {
		font-size: 2em;
	}

	form {
		width: 100%;
		margin: auto;
		color: #a1a1a1;
		font-size: 1.2em;
	}

	.form-group input {
		font-size: 1.1em;
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #a1a1a1;
		padding: 12px 0;
		visibility: visible;
		margin: 6% 0;
	}

	form .form-group label {
		display: block;
		visibility: hidden;
		margin: 10% 0;
	}
	button {
		width: 100%;
		padding: 4%;
		font-size: 1.5em;
		border: none;
		background-color: #a1a1a1;
		color: white;
	}
	a button {
		border: 2px solid #a1a1a1;
		background-color: white;
		color: #a1a1a1;
	}
	.img-button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 6% 0;
	}
	.img-button input {
		display: none;
	}
	.preview-img {
		height: 60px;
		width: 60px;
		border: 1px dashed black;
		cursor: pointer;
		margin: 0 6%;
	}
	.preview-img img {
		width: 100%;
		height: 100%;
		max-width: 60px;
		max-height: 60px;
	}
	button:hover {
		cursor: pointer;
	}
`;

const EditPlant = (props) => {
	const history = useHistory();
	const { id } = useParams();

	const initialState = {
		nickname: '',
		h20Frequency: '',
		speciesName: '',
		userId: localStorage.getItem('id'),
		image: null,
	};

	const [state, setState] = useState(initialState);

	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const uploadedImage = useRef(null);
	const imageUploader = useRef(null);

	const handleImageUpload = (e) => {
		const [file] = e.target.files;
		if (file) {
			const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			reader.onload = (e) => {
				current.src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// !! NEED TO EDIT PLANT HERE
		// ?? props.EditPlant(state);

		const newPlantData = {
			...state,
			nickname: state.nickname,
			h20Frequency: state.h20Frequency,
			speciesName: state.speciesName,
			image: state.image,
		};

		axiosWithAuth()
			.put(`/plants/edit-plants/${id}`, newPlantData)
			.then((res) => {
				console.log('updated plant data =====> ', res);
				history.push('/plants');
			})
			.catch((err) =>
				console.error('error changing plant data ', err.message)
			);

		setState({
			nickname: '',
			h20Frequency: '',
			speciesName: '',
			image: null,
			userId: localStorage.getItem('id'),
		});
	};

	return (
		<div>
			<StyledEditPlant>
				<h1>Edit Plant</h1>
				<PlantForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					state={state}
					imageUploader={imageUploader}
					uploadedImage={uploadedImage}
				/>
			</StyledEditPlant>
			<Navigation />
		</div>
	);
};

export default EditPlant;
