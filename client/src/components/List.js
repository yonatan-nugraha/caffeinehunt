import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants } from '../actions/index';
import '../../public/css/style.css';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ul class="restaurant">
      {this.props.restaurants.map(restaurant => {
        return (
          <li key={restaurant._id}>
            <a href="#">
              <span class="img">
                <img class="img-thumbnail" src={restaurant.image} />
              </span>
              <span class="restaurant-detail clearfix">
                <span class="establishment">{restaurant.establishments}</span>
                <span class="name">{restaurant.name}</span>
                <span class="subzone">{restaurant.subzone}</span>
                <span class="address">
                  <i class="fa fa-map-marker text-warning"></i> {restaurant.address}
                </span>
                <span class="cost">
                  <i class="fa fa-money text-success"></i> IDR {restaurant.costForTwo.toLocaleString()}
                </span>
                <span class="time">
                  <i class="fa fa-clock-o text-primary"></i> 10h to 22h (Mon-Sun)
                </span>
              </span>
            </a>
          </li>
        );
      })}
      </ul>
    );
  }
};

const mapStateToProps = state => {
  return { 
    restaurants: state.restaurantReducer.restaurants
  };
};

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);