//The structure of the database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;//Schema is the object of mongoose

var schema = new Schema({
  Name : {type: String , required: true},
  Value1 : {type: Number , required: true},
  Value2 : {type: Number , required: true},
  Value3 : {type: Number , required: true},
  Value4 : {type: Number , required: true}
});

module.exports = mongoose.model('customer',schema);
