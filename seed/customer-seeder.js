var Customer = require('../models/customer');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/report');


var customers = [
  new Customer({
    Name: 'Aman',
    Value1: 25,
    Value2: 36,
    Value3: 44,
    Value4: 49
  }),
  new Customer({
    Name: 'Daniel',
    Value1: 27,
    Value2: 38,
    Value3: 43,
    Value4: 46
  }),
  new Customer({
    Name: 'ASCII',
    Value1: 34,
    Value2: 23,
    Value3: 47,
    Value4: 43
  }),
  new Customer({
    Name: 'Ayush',
    Value1: 29,
    Value2: 46,
    Value3: 34,
    Value4: 48
  }),
  new Customer({
    Name: 'Navneet',
    Value1: 57,
    Value2: 23,
    Value3: 19,
    Value4: 42
  }),
  new Customer({
    Name: 'Anuraag',
    Value1: 21,
    Value2: 38,
    Value3: 47,
    Value4: 46
  }),
];

var done = 0;

for(var i = 0; i < customers.length; i++){
  customers[i].save(function(err , result){
    done++;
    if(done === customers.length){
      exit();
    }
  });//mongoose method to save items to the database
}

function exit() {
  mongoose.disconnect();
}
//saving to the database is asynchronous so chances are high that the database gets disconnected before the data is put to the database.
//so we need to disconnect in the callback, below code isn't right.
//mongoose.disconnect();
