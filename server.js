var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB'),
    recordRoutes = require('./expressRoutes/recordRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;
app.use('/', recordRoutes);
app.use('/records', recordRoutes);

const server = app.listen(port, function() {
  console.log('Listening on port from server.js file ' + port);
});