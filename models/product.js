//The structure of the database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;//Schema is the object of mongoose

var schema = new Schema({
  imagePath : {type: String , required: true},
  title : {type: String , required: true},
  description : {type: String , required: true},
  price : {type: Number , required: true}
});

module.exports = mongoose.model('Product',schema);
