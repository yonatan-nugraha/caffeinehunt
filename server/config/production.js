module.exports = {
  app: {
    host: 'https://hidden-falls-86687.herokuapp.com',
    port: process.env.PORT || 3000,
    url: 'https://hidden-falls-86687.herokuapp.com',
  },
  db: {
    host: 'mongodb://ds225308.mlab.com',
    port: 25308,
    database: 'caffeinehunt',
    username: 'caffeinemaster',
    password: '123456',
    url: 'mongodb://caffeinemaster:123456@ds225308.mlab.com:25308/caffeinehunt',
  },
};
