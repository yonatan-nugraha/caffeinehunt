const env = process.env.REACT_APP_ENV;
const development = require('./development.js');
const production = require('./production.js');

switch (env) {
  case 'development':
    module.exports = development;
    break;
  case 'production':
    module.exports = production;
    break;
  default:
    module.exports = development;
    break;
}
