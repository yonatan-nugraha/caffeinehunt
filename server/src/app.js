const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const schema = require('./graphql');

const app = express();

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

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

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = app;
