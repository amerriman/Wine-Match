var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/wine',
  test: 'mongodb://localhost/wine-test',
  production: 'process.env.MONGOLAB_URI'
};

module.exports = config;





