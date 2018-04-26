import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants } from '../actions/index';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.handleDeleteRestaurant = this.handleDeleteRestaurant.bind(this);
  }

  componentDidMount() {  
    this.props.getRestaurants();

    // this.props.deleteRestaurant({ _id: 2 });
  }

  handleDeleteRestaurant(e) {
    this.props.deleteRestaurant({
      _id: e.target.value
    });
  }

  render() {
    return (
      <div class="row">
      {this.props.restaurants.map(restaurant => {
        return (
          <div class="col-xs-4 offset-xs-4" key={restaurant._id}>
            <figure class="figure">
              <img src={restaurant.image} class="figure-img img-fluid rounded" />
              <figcaption class="figure-caption">{restaurant.name}</figcaption>
              <button 
                value={restaurant._id}
                onClick={this.handleDeleteRestaurant}
                class="btn btn-danger"
                type="button">Delete
              </button>
            </figure>
          </div>
        );
      })}
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
    getRestaurants: getRestaurants,
    deleteRestaurant: deleteRestaurant
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);