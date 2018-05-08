import React from 'react';
import { Query } from 'react-apollo';
import { GET_RESTAURANTS } from '../queries';

const List = ({ coordinates }) => (
  <Query 
    query={GET_RESTAURANTS} 
    variables={{ latitude: coordinates.latitude, longitude: coordinates.longitude, offset: 0, limit: 10 }}
    notifyOnNetworkStatusChange
  >
    {({ loading, error, data, networkStatus, fetchMore }) => {
      if (error) { 
        return (<div></div>)
      }

      if (loading) {
        return (
          <div className="data-loading">
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        );
      }

      const handleScroll = () => {
        fetchMore({
          variables: {
            offset: data.restaurants.length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              restaurants: [...prev.restaurants, ...fetchMoreResult.restaurants]
            });
          }
        });
      };

      window.scrollTo(0, document.documentElement.scrollHeight);

      return (
        <ul className="restaurant">
          {data.restaurants.map(restaurant => {
            return (
              <li key={restaurant._id}>
                <a href={`http://maps.google.com/maps?q=${restaurant.name} ${restaurant.location.locality}`} target="_blank">
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
                      <i className="fa fa-clock-o text-primary"></i> {restaurant.openingHours}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
          <li className="load-more">
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleScroll}>
              Load More
            </button>
          </li>
        </ul>
      );
    }}
  </Query>
);

export default List;