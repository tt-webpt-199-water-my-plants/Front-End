import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addNewPlant } from '../actions';

const AddPlant = (props, { plants, isLoading, error }) => {
	const initialState = {
		id: Date.now(),
		nickname: '',
		h2OFrequency: '',
		speciesName: '',
		image: null,
	};

	const [state, setState] = useState(initialState);
	// class AddPlant extends React.Component {
	// 	constructor() {
	// 		super();
	// 		this.state = {
	// 			id: Date.now(),
	// 			nickname: '',
	// 			h2OFrequency: '',
	// 			speciesName: '',
	// 			image: null,
	// 		};
	// 	}

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
			id: '',
			nickname: '',
			h2OFrequency: '',
			speciesName: '',
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
						value={state.h2OFrequency}
						onChange={handleChange}
						name="h2OFrequency"
						id="h2OFrequency"
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
							// multiple={false}
							// value={state.image}
							onChange={handleImageUpload}
							ref={imageUploader}
							style={{
								display: 'none',
							}}
							// name="image"
							// id="image"
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
			</form>
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
