var express = require('express');
var app = express();
var recordRoutes = express.Router();

// Require Item model in our routes module
var Record = require('../models/Record');
var Country = require('../models/Country');

// Defined store route
recordRoutes.route('/add/:entity').post(function (req, res) {
  var entity = req.params.entity;
  var record = (entity == 'Record' ? new Record(req.body) : new Country(req.body));
  record.save()
    .then(item => {
    res.status(200).json({'record': entity + ' added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
recordRoutes.route('/:entity').get(function (req, res) {
  var entity = req.params.entity;
  var entityType = (entity == 'records' ? Record : Country);
  entityType.find(function (err, records) {
    if(err){
      console.log(err);
    }
    else {
      res.json(records);
    }
  });
});

// Defined edit route
recordRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Record.findById(id, function (err, record) {
      res.json(record);
  });
});

//  Defined update route
recordRoutes.route('/update/:id').post(function (req, res) {
    Record.findById(req.params.id, function(err, record) {
    if (!record)
      return next(new Error('Could not load Document'));
    else {
        record.name = req.body.name;
        record.price = req.body.price;

        record.save().then(record => {
            res.json('Update complete');
        })
        .catch(err => {
                res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
recordRoutes.route('/delete/:id').get(function (req, res) {
   Record.findByIdAndRemove({_id: req.params.id}, function(err, record){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = recordRoutes;