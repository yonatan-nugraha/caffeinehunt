const express = require('express');
const config = require('../config/default');
const path = require('path');

const app = express();
const port = config.app.port;

app.use(express.static(path.join(__dirname, '/../build')));
app.use(express.static(path.join(__dirname, '/../public')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
