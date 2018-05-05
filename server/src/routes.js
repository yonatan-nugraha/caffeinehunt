const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const restaurantController = require('./controllers/restaurant.js');
const schema = require('./graphql');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());

  app.use(morgan('combined'));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

  app.use(express.static(path.join(__dirname, '/../public')));

  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.post('/restaurants', restaurantController.create);
  app.get('/restaurants', restaurantController.findAll);
  app.get('/restaurants/:restaurantId', restaurantController.findOne);
  app.put('/restaurants/:restaurantId', restaurantController.update);
  app.delete('/restaurants/:restaurantId', restaurantController.delete);

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
};
