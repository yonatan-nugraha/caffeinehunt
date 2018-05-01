module.exports = {
  app: {
    host: 'http://localhost',
    port: process.env.PORT || 3000,
  },
  db: {
    host: 'mongodb://localhost',
    port: 27017,
    database: 'caffeinehunt',
    username: '',
    password: '',
    url: 'mongodb://localhost:27017/caffeinehunt',
  },
};
