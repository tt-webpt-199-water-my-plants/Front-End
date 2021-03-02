import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import Plant from './Plant';

const PlantsList = () => {
	const [plants, setPlants] = useState([]);

	const getPlants = () => {
		axiosWithAuth()
			.get(
				`https://water-my-plants-api-t199.herokuapp.com/api/plants/${localStorage.getItem(
					'id'
				)}`
			)
			.then((response) => {
				setPlants(response.data);
			});
	};

	useEffect(() => {
		getPlants();
	}, []);

	return (
		<div>
			{plants.map((plant) => {
				return <Plant plant={plant} key={plant.id} />;
			})}
		</div>
	);
};

export default PlantsList;
