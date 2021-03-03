import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addNewPlant } from '../actions';
import styled from 'styled-components'
import Navigation from './Navigation'

const StyledAddPlant = styled.section`
	width:60vw;
	max-width:550px;
	margin:auto;
	text-align:center;
	padding-bottom: 150px;

	h1 {
		font-size:2em;
	}

	form {
		width:100%;
		margin:auto;
		color:#a1a1a1;
		font-size:1.2em;
	}

	.form-group input {
		font-size:1.1em;
		width:100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #a1a1a1;
		padding:12px 0;
		visibility:visible;
		margin: 6% 0;
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
	.img-button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 6% 0;
	}
	.img-button input {
		display:none;
	}
	.preview-img {
		height: 60px;
		width: 60px;
		border: 1px dashed black;
		cursor:pointer;
		margin:0 6%
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
`

const AddPlant = (props) => {
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
		props.addNewPlant(state);

		setState({
			nickname: '',
			h20Frequency: '',
			speciesName: '',
			userId: localStorage.getItem('id'),
			image: null,
		});
	};

	return (
		<div>
			<StyledAddPlant>
				<h1>Add Plant</h1>
				<form onSubmit={handleSubmit}>
					<div className="newPlant form-group">
						<input
							value={state.nickname}
							onChange={handleChange}
							name="nickname"
							id="nickname"
							placeholder="Nickname"
						/>
						<input
							value={state.h20Frequency}
							onChange={handleChange}
							name="h20Frequency"
							id="h20Frequency"
							placeholder="H2O Frequency"
						/>
						<input
							value={state.speciesName}
							onChange={handleChange}
							name="speciesName"
							id="speciesName"
							placeholder="Species Name"
						/>
						<div className="img-button">
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								ref={imageUploader}
							/>
							<div
								className="preview-img"
								onClick={() => imageUploader.current.click()}
							>
								<img
									ref={uploadedImage}
									alt="flower"
								/>
							</div>
							<p>Click to upload Image</p>
						</div>
					</div>
					<button>Submit Plant</button>
				</form>
			</StyledAddPlant>
			<Navigation />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		plants: state.plants,
		isLoading: state.isLoading,
		error: state.error,
	};
};

export default connect(mapStateToProps, { addNewPlant })(AddPlant);
