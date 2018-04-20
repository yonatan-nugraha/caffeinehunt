import { combineReducers } from 'redux';
import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANTS } from '../actions/types';

const initialState = {
  restaurants: [
    {
    	id: 1,
      name: "St. Ali",
      image: "https://b.zmtcdn.com/data/pictures/8/18386858/c036a4d9c577a45da5f29116bd650e0a_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
    }, 
    {
    	id: 2,
      name: "Okuzono",
      image: "https://b.zmtcdn.com/data/pictures/7/18609057/cfd57778e5af14976219f4e0b87e2fb8_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
    }
  ]
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
  	case GET_RESTAURANTS:
  		return state;
  	case ADD_RESTAURANT:
  		return { ...state, restaurants: [...state.restaurants, action.payload] };
    case DELETE_RESTAURANT:
      return { ...state, restaurants: state.restaurants.filter(restaurant => restaurant.id !== action.payload.id) };
    default:
      return state;
  }
};

export default combineReducers({
	restaurantReducer
})