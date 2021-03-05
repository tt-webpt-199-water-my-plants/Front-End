import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';

const StyledPlant = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	margin: 20px 0;
	border-radius: 20px;

	img {
		width: 100px;
		height: auto;
		margin-right: 20px;
	}

	.plant-content {
		flex: 1 1 auto;
	}

	button {
		background: #fff;
		border: none;
		font-weight: bold;
		font-size: 1.1rem;
		border-radius: 50px;
		width: 40px;
		height: 40px;
		transition: all 0.15s linear;

		&:hover {
			cursor: pointer;
			color: #d39797 !important;
			box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
		}
	}

	.nickname {
		color: #000;
		font-size: 1.1rem;
		font-weight: 500;
	}

	@media screen and (max-width: 767px) {
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 40px 20px;
		position: relative;

		img {
			margin: 0;
			border: 3px solid #fff;
			border-radius: 10px;
		}

		.nickname {
			margin-bottom: 0;
		}

		.watering-frequency {
			margin: 10px 0 10px;
		}

		button {
			position: absolute;
			top: 10px;
			right: 10px;
		}
	}
`;

const Plant = (props) => {
	const { plant, plants, setPlants } = props;
	const plantImage =
		plant.image === 'null' || !plant.image
			? '/plant-thumbnail.png'
			: plant.image;

	const deletePlant = (event) => {
		event.preventDefault();
		event.stopPropagation();
		axiosWithAuth()
			.delete(
				`https://water-my-plants-api-t199.herokuapp.com/api/plants/delete-plant/${plant.id}`
			)
			.then((response) => {
				setPlants(
					plants.reduce((allPlants, currentPlant) => {
						if (currentPlant.id !== plant.id) {
							allPlants.push(currentPlant);
						}
						return allPlants;
					}, [])
				);
			});
	};

	return (
		<Link to={`/plants/${plant.id}/edit`}>
			<StyledPlant className="plant">
				<img src={plantImage} alt={plant.nickname} />
				<div className="plant-content">
					<p className="nickname">
						{plant.nickname}{' '}
						<span className="species">
							({plant.speciesName})
						</span>
					</p>
					<p className="watering-frequency">
						Watering Frequency: {plant.h20Frequency} days
					</p>
				</div>
				<button onClick={deletePlant}>x</button>
			</StyledPlant>
		</Link>
	);
};

export default Plant;
