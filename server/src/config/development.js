module.exports = {
  app: {
    host: 'http://localhost',
    port: process.env.PORT || 4000,
    url: 'http://localhost:4000',
  },
  db: {
    host: 'mongodb://localhost',
    port: 27017,
    database: 'caffeinehunt',
    username: '',
    password: '',
    url: 'mongodb://localhost:27017/caffeinehunt2',
  },
};
