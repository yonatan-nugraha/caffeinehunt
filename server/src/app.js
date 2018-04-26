const express = require('express');

const app = express();

require('./routes.js')(app);

module.exports = app;
