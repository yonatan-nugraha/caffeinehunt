import { combineReducers } from 'redux';
import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANTS, RESET_RESTAURANTS } from '../actions/types';

const initialState = {
  restaurants: [],
  coordinates: {
    latitude: '<latitude>',
    longitude: '<longitude>',
  },
  page: 1,
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload.page === 1 ? action.payload.restaurants : state.restaurants.concat(action.payload.restaurants),
        coordinates: {
          latitude: action.payload.coordinates.latitude,
          longitude: action.payload.coordinates.longitude,
        },
        page: state.page + 1,
      };
    case ADD_RESTAURANT:
      return { ...state, restaurants: [...state.restaurants, action.payload] };
    case DELETE_RESTAURANT:
      return { ...state, restaurants: state.restaurants.filter(restaurant => restaurant._id !== action.payload._id) };
    case RESET_RESTAURANTS:
      return { ...state, restaurants: [] };
    default:
      return state;
  }
};

export default combineReducers({
  restaurantReducer,
});
