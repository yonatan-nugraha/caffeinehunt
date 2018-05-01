import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants, resetRestaurants } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: '<latitude>',
      longitude: '<longitude>',
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

        this.setState({
          latitude,
          longitude
        });

        this.props.getRestaurants({
          latitude,
          longitude
        });

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
      <div class="input-group search-bar">
        <input type="text" class="form-control" placeholder={`${this.state.latitude}, ${this.state.longitude}`} disabled/>
        <span class="search-button">
          <button type="button" class={ this.state.active ? "btn btn-danger" : "btn btn-secondary disabled" } onClick={this.handleGetRestaurants}>
            <span class="glyphicon glyphicon-search">Find</span>
          </button>  
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
    getRestaurants: getRestaurants,
    resetRestaurants: resetRestaurants,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Form);