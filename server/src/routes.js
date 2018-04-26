const bodyParser = require('body-parser');
const restaurantController = require('./controllers/restaurant.js');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.post('/restaurants', restaurantController.create);
  app.get('/restaurants', restaurantController.findAll);
  app.get('/restaurants/:restaurantId', restaurantController.findOne);
  app.put('/restaurants/:restaurantId', restaurantController.update);
  app.delete('/restaurants/:restaurantId', restaurantController.delete);
};
