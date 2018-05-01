import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getRestaurants } from '../actions/index';
import '../../public/css/style.css';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !this.state.isLoading) {
      this.setState({ isLoading: true });

      setTimeout(() => {
        this.setState({ isLoading: false });
        const page = this.props.page;
        this.props.getRestaurants({
          latitude: this.props.coordinates.latitude,
          longitude: this.props.coordinates.longitude
        }, page);
      }, 1000);
    }
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
      {this.state.isLoading ? (
      <div className="data-loading">
        <i className="fa fa-refresh fa-spin"></i>
      </div>
      ) : (<div className="data-loading"></div>)}
      </ul>
    );
  }
};

const mapStateToProps = state => {
  return { 
    restaurants: state.restaurantReducer.restaurants,
    coordinates: state.restaurantReducer.coordinates,
    page: state.restaurantReducer.page,
  };
};

const mapDispatchToProps = dispatch => {  
  return bindActionCreators({
    getRestaurants: getRestaurants,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);