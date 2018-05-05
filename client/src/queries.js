import { gql } from 'apollo-boost';

export const GET_RESTAURANTS = gql`
  query getRestaurants($latitude: Float!, $longitude: Float!, $page: Int!) {
    restaurants(latitude: $latitude, longitude: $longitude, page: $page) {
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