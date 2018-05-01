import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants, resetRestaurants } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };

    this.handleGetRestaurants = this.handleGetRestaurants.bind(this);
  }

  handleGetRestaurants(e, data) {
    this.setState({ active: false });

    const geolocation = navigator.geolocation;
  
    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const page = 1;

        this.setState({
          latitude,
          longitude
        });

        this.props.getRestaurants({
          latitude,
          longitude,
        }, page);

        this.setState({ active: true });
      }, () => {
        this.setState({ active: true });
        this.props.resetRestaurants();
        alert('Permission Denied');
        throw new Error('Permission Denied');
      });

    } else {
      this.setState({ active: true });
      this.props.resetRestaurants();
      alert('Not Supported');
      throw new Error('Not Supported');
    }
  }

  render() {
  	return (
      <div className="input-group search-bar">
        <input type="text" className="form-control" placeholder={`${this.props.coordinates.latitude}, ${this.props.coordinates.longitude}`} disabled/>
        <span className="search-button">
          <button type="button" className={ this.state.active ? "btn btn-danger" : "btn btn-secondary disabled" } onClick={this.handleGetRestaurants}>
            <span className="glyphicon glyphicon-search">Find</span>
          </button>  
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coordinates: state.restaurantReducer.coordinates,
  };
};

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
    getRestaurants: getRestaurants,
    resetRestaurants: resetRestaurants,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);