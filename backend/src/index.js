const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default');

const app = express();
const port = config.app.port || 4000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});