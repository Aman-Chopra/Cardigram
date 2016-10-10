var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/report');


var products = [
  new Product({
    imagePath: 'imagefiles/aman.jpg',
    title: 'Aman Chopra',
    description: 'You know who I am',
    price: 1200
  }),
  new Product({
    imagePath: 'imagefiles/suvimal.jpg',
    title: 'Suvimal Yashraj',
    description: 'You also know who he is',
    price: 2000
  }),
  new Product({
    imagePath: 'imagefiles/snigdha.jpg',
    title: 'Goddess',
    description: 'No description required',
    price: 3000
  }),
  new Product({
    imagePath: 'imagefiles/aman.jpg',
    title: 'Aman Chopra',
    description: 'You know who I am',
    price: 1200
  }),
  new Product({
    imagePath: 'imagefiles/suvimal.jpg',
    title: 'Suvimal Yashraj',
    description: 'You also know who he is',
    price: 2000
  }),
  new Product({
    imagePath: 'imagefiles/snigdha.jpg',
    title: 'Goddess',
    description: 'No description required',
    price: 3000
  }),
];

var done = 0;

for(var i = 0; i < products.length; i++){
  products[i].save(function(err , result){
    done++;
    if(done === products.length){
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
