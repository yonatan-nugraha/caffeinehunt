import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANTS } from './types';

export const getRestaurants = restaurant => { 
	return {
		type: GET_RESTAURANTS, 
		payload: {
			name: "St. Alisss",
      image: "https://b.zmtcdn.com/data/pictures/8/18386858/c036a4d9c577a45da5f29116bd650e0a_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
		} 
	}
};

export const addRestaurant = restaurant => ({ 
	type: ADD_RESTAURANT, 
	payload: restaurant 
});

export const deleteRestaurant = restaurant => ({ 
	type: DELETE_RESTAURANT, 
	payload: restaurant 
});