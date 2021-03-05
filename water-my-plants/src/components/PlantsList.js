import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import Plant from './Plant';
import styled from 'styled-components';

const StyledPlantsList = styled.div`
	padding: 0 20px;

	a {
		text-decoration: none;

		&:nth-child(3n + 1) .plant {
			background: #c2d6bd;
			
			.species, .watering-frequency, button {
				color: #709468;
			}
		}

		&:nth-child(3n + 2) .plant {
			background: #c9e3e3;
			
			.species, .watering-frequency, button {
				color: #6c9e9e;
			}
		}

		&:nth-child(3n + 3) .plant {
			background: #f2dac6;
			
			.species, .watering-frequency, button {
				color: #ce8e59;
			}
		}
	}
`;

const PlantsList = (props) => {
	const { plants, setPlants } = props;

	const getPlants = () => {
		axiosWithAuth()
			.get(`https://water-my-plants-api-t199.herokuapp.com/api/plants/${localStorage.getItem('id')}`)
			.then((response) => {
				console.log('plants data - user =====> ', response.data);
				setPlants(response.data);
			});
	};

	useEffect(() => {
		getPlants();
	}, []);

	return (
		<StyledPlantsList>
			{plants.map((plant, index) => {
				return <Plant plant={plant} plants={plants} setPlants={setPlants} key={index} />;
			})}
		</StyledPlantsList>
	);
};

export default PlantsList;
