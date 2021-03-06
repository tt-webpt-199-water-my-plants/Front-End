import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPlant } from '../actions';
import styled from 'styled-components';
import Navigation from './Navigation';
import PlantForm from './PlantForm';
import * as yup from 'yup';
import FormSchemaEditPlant from '../validation/FormSchemaEditPlant';

const StyledAddPlant = styled.section`
	width:60vw;
	max-width:550px;
	margin:auto;
	text-align:center;
	padding-bottom: 150px;

	h1 {
		font-size: 2em;
	}

	form {
		width: 100%;
		margin: auto;
		color: #b3b5ba;
		font-size: 1.2em;
	}

	.form-group input {
		font-size: 1.1em;
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 2px solid #99c4d1;
		padding: 12px 0;
		visibility: visible;
		margin: 6% 0;

		&::placeholder {
			color: #b3b5ba;
		}
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
		background-color: #99c4d1;
		color: white;
		transition: all .2s linear;
	}
	a button {
		border: 2px solid #99c4d1;
		background-color: white;
		color: #99c4d1;
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
		background-color: rgba(153, 196, 209, .8);
		color: #fff;

		&:disabled {
			cursor: initial;
			background-color: #99c4d1;
		}
	}
`

const AddPlant = (props) => {
	const { plants, setPlants } = props;
	const history = useHistory();
	const initialDisabled = true;

	const initialState = {
		nickname: '',
		h20Frequency: '',
		speciesName: '',
		userId: localStorage.getItem('id'),
		image: '',
	};

	const initialFormErrors = {
		nickname: '',
		h20Frequency: '',
		speciesName: '',
		image: '',
	}

	const [state, setState] = useState(initialState);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	useEffect(() => {
		FormSchemaEditPlant.isValid(state)
		.then(isValid => setDisabled(!isValid))
	}, [state])

	const handleChange = (event) => {
		const { name, value } = event.target;
		yup.reach(FormSchemaEditPlant, name)
		  .validate(value)
			.then(() => setFormErrors({...formErrors, [name]: ''}))
			.catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
		setState({ ...state, [name]: value })
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNewPlant(state, (response) => {
			setPlants([...plants, response]);
		});
		setState({
			nickname: '',
			h20Frequency: '',
			speciesName: '',
			image: '',
			userId: localStorage.getItem('id'),
		});
		history.push('/plants');
	};

	return (
		<div>
			<StyledAddPlant>
				<h1>Add Plant</h1>
				<PlantForm 
					handleSubmit={handleSubmit} 
					handleChange={handleChange} 
					state={state} 
					errors={formErrors}
					disabled={disabled}
				/>
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
