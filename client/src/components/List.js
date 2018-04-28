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
      <div class="row">
        <div class="col-md-12">
          <ul class="widget-products">
          {this.props.restaurants.map(restaurant => {
            return (
              <li key={restaurant._id}>
                <a href="#">
                  <span class="img">
                    <img class="img-thumbnail" src={restaurant.image} />
                  </span>
                  <span class="product clearfix">
                    <span class="name">{restaurant.name}</span>
                    <span class="price">
                      <i class="fa fa-money"></i> {restaurant.costForTwo}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
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