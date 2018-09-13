var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Country = new Schema({
  country: {
    type: String
  },
  baseCurrency: String,
  baseRate: {
    type: Number
  },
  ratePerHourCap: String,
  sessionCap: String
}, {
    collection: 'countries'
});

module.exports = mongoose.model('Country', Country);