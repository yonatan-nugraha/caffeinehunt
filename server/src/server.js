const app = require('./app');
const config = require('./config/default');
const mongodb = require('./mongodb');

const { port } = config.app;

mongodb.connect();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
