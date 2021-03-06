import React from 'react';
import styled from 'styled-components';

const StyledPlantForm = styled.div`
	.error {
		color: #e08c8c;
		font-weight: bold;
		font-size: 0.7em;
		visibility: visible;
		text-align: left;
		margin: -25px 0 0;
	}

	button {
		margin-top: 30px;
	}
`;

const PlantForm = (props) => {
	const { handleSubmit, handleChange, state, errors, disabled } = props;
	return (
		<StyledPlantForm>
			<form onSubmit={handleSubmit}>
				<div className="newPlant form-group">
					<input
						value={state.nickname}
						onChange={handleChange}
						name="nickname"
						id="nickname"
						placeholder="Nickname"
					/>
					<p className="error">{errors.nickname}</p>
					<input
						value={state.h20Frequency}
						onChange={handleChange}
						name="h20Frequency"
						id="h20Frequency"
						placeholder="H2O Frequency"
					/>
					<p className="error">{errors.h20Frequency}</p>
					<input
						value={state.speciesName}
						onChange={handleChange}
						name="speciesName"
						id="speciesName"
						placeholder="Species Name"
					/>
					<p className="error">{errors.speciesName}</p>
					<input
						value={state.image ? state.image : ''}
						onChange={handleChange}
						name="image"
						id="image"
						placeholder="Image URL"
					/>
					<p className="error">{errors.image}</p>
				</div>
				<button disabled={disabled}>Submit Plant</button>
			</form>
		</StyledPlantForm>
	);
};

export default PlantForm;
