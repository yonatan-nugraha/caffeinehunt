import axios from 'axios';
import { GET_RESTAURANTS, ADD_RESTAURANT, DELETE_RESTAURANT, RESET_RESTAURANTS } from './types';
import config from '../../config/default';

const defaultRestaurants = [
  {
    _id: 1,
    name: 'St. Ali',
    image: 'https://b.zmtcdn.com/data/pictures/8/18386858/c036a4d9c577a45da5f29116bd650e0a_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
  },
];

const getRestaurantsAsync = restaurants => ({
  type: GET_RESTAURANTS,
  payload: restaurants,
});

const addRestaurantAsync = restaurant => ({
  type: ADD_RESTAURANT,
  payload: restaurant,
});

const deleteRestaurantAsync = restaurant => ({
  type: DELETE_RESTAURANT,
  payload: restaurant,
});

export const getRestaurants = (coordinates) => {
  return (dispatch) => {
    axios.get(`${config.server.url}/restaurants?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)
      .then((res) => {
        res.data.forEach((restaurant) => {
          restaurant.image = `${config.server.url}/images/restaurants/${restaurant.image}`;
        });
        dispatch(getRestaurantsAsync(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getRestaurantsAsync(defaultRestaurants));
      });
  };
};

export const addRestaurant = (restaurant) => {
  return (dispatch) => {
    axios.post(`${config.server.url}/restaurants`, restaurant)
      .then((res) => {
        dispatch(addRestaurantAsync(res.data));
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
};

export const deleteRestaurant = (restaurant) => {
  return (dispatch) => {
    axios.delete(`${config.server.url}/restaurants/${restaurant._id}`)
      .then((res) => {
        alert(res.data.message);
        dispatch(deleteRestaurantAsync(restaurant));
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
};

export const resetRestaurants = () => ({
  type: RESET_RESTAURANTS,
  payload: null,
});

