import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './style.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import config from './config/default';

const client = new ApolloClient({
  uri: `${config.server.url}/graphql`,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
);