import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants } from '../actions/index';

const mapStateToProps = state => {
  return { 
    restaurants: state.restaurantReducer.restaurants
  };
};

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
    getRestaurants: getRestaurants,
    addRestaurant: addRestaurant,
    deleteRestaurant: deleteRestaurant
  }, dispatch);
}

class List extends React.Component {
 constructor(props) {
    super(props);

    this.props.getRestaurants();

    // this.props.addRestaurant({
    //   id: 4,
    //   name: 'Goedkoop', 
    //   image: 'https://b.zmtcdn.com/data/pictures/chains/1/7403971/5ab2233afc4785e968390e60d0fd7868_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
    // });

    // this.props.deleteRestaurant({ id: 2 });
  }

  render() {
    return (
      <div class="row">
      {this.props.restaurants.map(restaurant => {
        return (
          <div class="col-xs-4 offset-xs-4">
            <figure class="figure">
              <img src={restaurant.image} class="figure-img img-fluid rounded" />
              <figcaption class="figure-caption">{restaurant.name}</figcaption>
            </figure>
          </div>
        );
      })}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);