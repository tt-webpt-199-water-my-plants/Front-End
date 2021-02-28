import axiosWithAuth from '../utils/axiosWithAuth';

// ?? start fetch / fetch error / add success
export const START_FETCHING = 'START_FETCHING';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_SUCCESS = 'ADD_SUCCESS';

// ?? Fetch plant data
export const FETCH_PLANT_DATA = 'FETCH_PLANT_DATA';

// ?? Post plant data
export const ADD_PLANT_DATA = 'ADD_PLANT_DATA';

// ?? getPlantData
export const getPlantData = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCHING });

		// ?? axiosWithAuth().get
		axiosWithAuth()
			// ?? endpoint
			.get('/plants')
			.then((res) => {
				console.log('Plant data pulled from API =====> ', res);
				dispatch({ type: FETCH_PLANT_DATA, payload: res.data });
			})
			.catch((err) => {
				console.error('unable to collect plant data', err.message);
				dispatch({ type: FETCH_ERROR, payload: err.message });
			});
	};
};

// ?? addNewPlant
export const addNewPlant = (plant) => {
	return (dispatch) => {
		dispatch({ type: ADD_PLANT_DATA });

		// ?? axiosWithAuth().post
		axiosWithAuth()
			// ?? endpoint
			.post('/plants/new-plants', plant)
			.then((res) => {
				console.log('Plant data added to API =====> ', plant);
				dispatch({ type: ADD_SUCCESS, payload: res.data });
			})
			.catch((err) => {
				console.error('unable to add plant data', err.message);
				dispatch({ type: FETCH_ERROR, payload: err.message });
			});
	};
};
