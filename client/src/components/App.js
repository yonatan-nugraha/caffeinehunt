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
      page: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    document.body.addEventListener('touchmove', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.setState(() => ({ 
        coordinates: {
          latitude: this.state.coordinates.latitude,
          longitude: this.state.coordinates.longitude
        },
        page: this.state.page + 1
      }));

      return false;
    }
  }

  handleGetRestaurants = () => {
    const geolocation = navigator.geolocation;

    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        this.setState(() => ({ 
          coordinates: {
            latitude,
            longitude
          },
          page: 1
        }));
      }, () => {
        alert('Permission Denied');
      });

    } else {
      alert('Not Supported');
    }
  };

  render() {
    return (
      <div>
        <Form 
          handleGetRestaurants={this.handleGetRestaurants}
          coordinates={this.state.coordinates}
        />
        <List 
          coordinates={this.state.coordinates}
          page={this.state.page}
        />
      </div>
    );
  }
}

export default App;