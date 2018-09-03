import React, { Component } from 'react';
import Form from './Form';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      coordinates: {
        latitude: '<latitude>',
        longitude: '<longitude>',
      },
      isLoading: false,
    };
  }

  handleGetRestaurants = () => {
    this.setState({ isLoading: true });
    const geolocation = navigator.geolocation;

    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        this.setState({ 
          coordinates: {
            latitude,
            longitude
          },
          isLoading: false,
        });
      }, () => {
        this.setState({ isLoading: false });
        alert('Permission Denied');
      });

    } else {
      this.setState({ isLoading: false });
      alert('Not Supported');
    }
  };

  render() {
    return (
      <div>
        <Form 
          handleGetRestaurants={this.handleGetRestaurants}
          coordinates={this.state.coordinates}
          isLoading={this.state.isLoading}
        />
        <List 
          coordinates={this.state.coordinates}
        />
      </div>
    );
  }
}

export default App;