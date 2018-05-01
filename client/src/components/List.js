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
      <ul className="restaurant">
      {this.props.restaurants.map(restaurant => {
        return (
          <li key={restaurant._id}>
            <a href="#">
              <span className="img">
                <img className="img-thumbnail" src={restaurant.image} />
              </span>
              <span className="restaurant-detail clearfix">
                <span className="establishment">{restaurant.establishments}</span>
                <span className="name">{restaurant.name}</span>
                <span className="subzone">{restaurant.subzone}</span>
                <span className="address">
                  <i className="fa fa-map-marker text-warning"></i> {restaurant.address}
                </span>
                <span className="cost">
                  <i className="fa fa-money text-success"></i> IDR {restaurant.costForTwo.toLocaleString()}
                </span>
                <span className="time">
                  <i className="fa fa-clock-o text-primary"></i> 10h to 22h (Mon-Sun)
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