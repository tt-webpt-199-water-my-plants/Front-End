import {
	START_FETCHING,
	FETCH_ERROR,
	ADD_SUCCESS,
	FETCH_PLANT_DATA,
	ADD_PLANT_DATA,
} from '../actions';

// ?? set initialState
export const initialState = {
	plants: [],
	isLoading: false,
	didAddPlant: false,
	error: '',
};

// ?? plantReducer, utilize actions
export const plantReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_FETCHING: {
			return {
				...state,
				isLoading: true,
				error: '',
			};
		}

		case FETCH_PLANT_DATA: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}

		case FETCH_ERROR: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}

		case ADD_PLANT_DATA: {
			return {
				...state,
				didAddPlant: true,
				plants: [...state.plants, action.payload],
			};
		}

		case ADD_SUCCESS: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}
		default:
			return state;
	}
};
