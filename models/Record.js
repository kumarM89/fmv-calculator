var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Record = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  }
}, {
    collection: 'records'
});

module.exports = mongoose.model('Record', Record);