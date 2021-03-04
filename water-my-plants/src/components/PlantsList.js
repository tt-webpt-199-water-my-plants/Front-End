import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import Plant from './Plant';
import styled from 'styled-components';

const StyledPlantsList = styled.div`
	padding: 0 20px;

	a {
		text-decoration: none;
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
			{plants.map((plant) => {
				return <Plant plant={plant} plants={plants} setPlants={setPlants} key={plant.id} />;
			})}
		</StyledPlantsList>
	);
};

export default PlantsList;
