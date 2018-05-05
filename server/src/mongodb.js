const mongoose = require('mongoose');
const config = require('./config/default');

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(config.db.url).then(() => {
      console.log('Successfully connected to the database');
    }).catch((err) => {
      console.log(`Could not connect to the database: ${err.message}`);
      process.exit();
    });
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
