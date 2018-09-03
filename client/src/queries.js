import { gql } from 'apollo-boost';

export const GET_RESTAURANTS = gql`
  query getRestaurants($latitude: Float!, $longitude: Float!, $offset: Int!, $limit: Int!) {
    restaurants(latitude: $latitude, longitude: $longitude, offset: $offset, limit: $limit) {
      _id
      name
      image
      rating
      establishments
      cuisines
      costForTwo
      openingHours
      phone
      location {
        address
        locality
        city
        latitude
        longitude
      }
    }
  }
`;