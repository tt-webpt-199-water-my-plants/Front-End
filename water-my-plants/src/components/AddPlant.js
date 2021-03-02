import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addNewPlant } from '../actions';
import Navigation from '../components/Navigation';

const AddPlant = (props) => {
	const initialState = {
		nickname: '',
		h20Frequency: '',
		speciesName: '',
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
		<section>
			<h2>Add Plant</h2>
			<form onSubmit={handleSubmit}>
				<div className="newPlant">
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
					<div
						className="img-button"
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							ref={imageUploader}
							style={{
								display: 'none',
							}}
						/>
						<div
							className="preview-img"
							style={{
								height: '60px',
								width: '60px',
								border: '1px dashed black',
							}}
							onClick={() => imageUploader.current.click()}
						>
							<img
								ref={uploadedImage}
								style={{
									width: '100%',
									height: '100%',
									maxWidth: '60px',
									maxHeight: '60px',
									position: 'absolute',
								}}
								alt="flower"
							/>
						</div>
					</div>
					Click to upload Image
				</div>
				<button>Submit Plant</button>
			</form>
			<Navigation />
		</section>
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
