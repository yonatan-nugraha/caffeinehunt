import React from 'react';
import { Query } from 'react-apollo';
import { GET_RESTAURANTS } from '../queries';

const List = ({ coordinates, page }) => (
  <Query 
    query={GET_RESTAURANTS} 
    variables={{ latitude: coordinates.latitude, longitude: coordinates.longitude, page }}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, refetch, networkStatus, client }) => {
      if (loading) {
        return (
          <div className="data-loading">
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        );
      }

      if (error) { 
        return (<div></div>)
      }

      return (
        <ul className="restaurant">
        {data.restaurants.map(restaurant => {
          return (
            <li key={restaurant._id}>
              <a href="#">
                <span className="img">
                  <img className="img-thumbnail" src={restaurant.image} alt=""/>
                </span>
                <span className="restaurant-detail clearfix">
                  <span className="establishment">{restaurant.establishments}</span>
                  <span className="name">{restaurant.name}</span>
                  <span className="locality">{restaurant.location.locality}</span>
                  <span className="address">
                    <i className="fa fa-map-marker text-warning"></i> {restaurant.location.address}
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
    }}
  </Query>
);

export default List;