const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('div'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', (req, res) => res.send({
  message: 'Welcome.',
}));
require('./server/routes')(app);

module.exports = app;
