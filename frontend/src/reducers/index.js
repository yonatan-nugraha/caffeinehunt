import { combineReducers } from 'redux';
import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANTS } from '../actions/types';

const initialState = {
  restaurants: []
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
  	case GET_RESTAURANTS:
      return { ...state, restaurants: action.payload };
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