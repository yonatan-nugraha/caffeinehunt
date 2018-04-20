const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default');
const mongoose = require('mongoose');

const app = express();
const port = config.app.port || 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect(config.db.url).then(() => {
	console.log('Successfully connected to the database');    
}).catch(err => {
	console.log(`Could not connect to the database: ${err.message}`);
	process.exit();
});

require('./routes/api.js')(app);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});