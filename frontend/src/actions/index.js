import axios from 'axios';
import { GET_RESTAURANTS, ADD_RESTAURANT, DELETE_RESTAURANT } from './types';

const restaurants = [
  {
  	_id: 1,
    name: 'St. Ali',
    image: 'https://b.zmtcdn.com/data/pictures/8/18386858/c036a4d9c577a45da5f29116bd650e0a_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
  }, 
  {
  	_id: 2,
    name: 'On Three',
    image: 'https://b.zmtcdn.com/data/pictures/8/18623698/e5e6461218778ce3b4751f15a8f44773_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
  },
  {
		_id: 3,
    name: 'Warung Nako',
    image: 'https://b.zmtcdn.com/data/pictures/2/18663732/9c7adc2960ed1cadbe2725a3e84df597_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'

  }
];

export const getRestaurants = () => {
  return dispatch => {
    axios.get('http://localhost:4000/restaurants')
    .then(res => {
      dispatch(getRestaurantsAsync(res.data));
    })
    .catch(err => {
    	console.log(err);
    	dispatch(getRestaurantsAsync(restaurants));
    });
  }
}

export const addRestaurant = restaurant => {
  return dispatch => {
  	axios.post('http://localhost:4000/restaurants', restaurant)
  	.then(res => {
  		dispatch(addRestaurantAsync(res.data));
  	})
  	.catch(err => {
  		alert(err.response.data.message);
  	});
  }
}

export const deleteRestaurant = restaurant => {
	return dispatch => {
  	axios.delete(`http://localhost:4000/restaurants/${restaurant._id}`)
  	.then(res => {
  		dispatch(deleteRestaurantAsync(restaurant));
  	})
  	.catch(err => {
  		alert(err.response.data.message);
  	});
  }
}

const getRestaurantsAsync = restaurants => ({
  type: GET_RESTAURANTS,
  payload: restaurants
});

const addRestaurantAsync = restaurant => ({ 
	type: ADD_RESTAURANT, 
	payload: restaurant 
});

const deleteRestaurantAsync = restaurant => ({ 
	type: DELETE_RESTAURANT, 
	payload: restaurant 
});

