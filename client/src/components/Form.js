import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addRestaurant, deleteRestaurant, getRestaurants } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	name: '',
    	image: '',
      latitude: '',
      longitude: '',
    };

    this.handleGetRestaurants = this.handleGetRestaurants.bind(this);
  }

  handleGetRestaurants(e) {
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
      }, () => {
        throw new Error('Permission Denied');
      });

    } else {
      throw new Error('Not Supported');
    }
  }

  render() {
  	return (
      <div class="row">
        <div class="col-md-12">
          <div class="input-group stylish-input-group">
            <input 
              type="text" 
              class="form-control" 
              placeholder={`${this.state.latitude}, ${this.state.longitude}`} />
            <span class="input-group-addon">
              <button onClick={this.handleGetRestaurants} type="button">
                <span class="glyphicon glyphicon-search">Find</span>
              </button>  
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
    getRestaurants: getRestaurants,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Form);