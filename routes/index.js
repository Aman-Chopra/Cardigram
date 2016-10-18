var express = require('express');
var router = express.Router();
//For route grouping
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();//using protection as a middleware
router.use(csrfProtection);//All the routers are protected using this csrf protection
var Order = require('../models/order');
var Cart = require('../models/cart');
/* GET home page. */
//var products = Product.find();finding is asynchronous so we require a callback
var Product = require('../models/product');//importing product model
var Customer = require('../models/customer');
var fs   = require("fs");
var driverChunks = [];

router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err , docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i+=chunkSize){
      productChunks.push(docs.slice(i , i+chunkSize));
    }
    res.render('shop/index', { title: 'Cardigram' , products: productChunks , successMsg: successMsg , noMessages: !successMsg});
  });
});


router.get('/dashboard', function(req, res, next) {
    res.render('shop/dashboard', { title: 'Dashboard'});
  });
  router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');//messsages like 'Email' already in use are stored in error of flash
    res.render('user/signin', { csrfToken: req.csrfToken() , messages: messages, hasErrors: messages.length > 0});//inbuilt method of csrf package to provide token as to which browser is accessing the server.
  });

  router.post('/signin', passport.authenticate('local.signin', {
      failureRedirect: '/signin',
      failureFlash: true
  }), function (req, res, next) {
      if (req.session.oldUrl) {
        console.log("hi");
          var oldUrl = req.session.oldUrl;
          req.session.oldUrl = null;
          res.redirect(oldUrl);
      } else {
        console.log("hi");
          res.redirect('/user/profile');
      }
  });


  router.get('/yolo', function(req, res, next) {

var dir = './public/uploads/tmp';
console.log("hi");
if (!fs.existsSync(dir)){
  console.log("hi");
    fs.mkdirSync(dir);
}

      res.render('shop/dashboard', { title: 'Dashboard'});
    });

router.get('/table', function (req, res, next) {
    Customer.find(function(err, docs){
      var customerChunks = [];
      for(var i = 0; i < docs.length; i++){
        customerChunks.push(docs.slice(i,i+1));
      }
      console.log(customerChunks);
      res.render('shop/table', { title: 'Tables' , customers: customerChunks});
  });
});

router.get('/try', function (req, res, next) {
      res.render('shop/try');
});



router.get('/getcharts', function (req, res, next) {
      res.render('shop/charts', { title: 'Charts'});
  });




router.get('/charts', function (req, res, next) {
    Customer.find(function(err, docs){
      var customerChunks = [];
      for(var i = 0; i < docs.length; i++){
        customerChunks.push(docs.slice(i,i+1));
      }
      console.log(customerChunks);
      var jsonObj = {
        data : []
    };
    var temp = {
    labels : [],
    series : [[]]
  }

      for(var i = 0; i < customerChunks.length; i++) {
          temp.labels.push(customerChunks[i][0]["Name"]);
          var temp1 = customerChunks[i][0]["Value1"];
          temp.series[0].push(temp1);
          jsonObj.data.push(temp);
      }
      console.log(jsonObj);
      var toBeSentData = JSON.stringify(jsonObj);
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(toBeSentData);
      console.log("string sent");
  });
});

router.post('/name', function (req, res) {
    Customer.find(function(err, docs){
      var j = 0;
      for(var i = 0; i < docs.length; i++){
        if(docs[i]._id==req.body.selected[j]){
        driverChunks.push(docs[i]);
        j++;
      }
      }
    })
  });

  router.get('/name', function (req, res) {
      var jsonObj = {
        data : []
    };
    var temp = {
    labels: [],
    series : [[]]
  }

      for(var i = 0; i < driverChunks.length; i++) {
          temp.labels.push(driverChunks[i]["Name"]);
          var temp1 = driverChunks[i]["Value1"];
          temp.series[0].push(temp1);
      }
      jsonObj.data.push(temp);
      console.log(temp);
      console.log(jsonObj);
      var toBeSentData = JSON.stringify(jsonObj);
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(toBeSentData);
      console.log("string sent");
      driverChunks = [];
});

router.get('/forms', isLoggedIn, function (req, res, next) {
        res.render('shop/forms', { title: 'Forms'});
    });

router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;//params is for routes data not the form data, for form data, it's body.
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});


router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_W6iKpLaZZGlJ4QMam0O64DQw"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }



        var order = new Order({
            user: req.user,//passport stores user in request throughout the session
            cart: cart,
            address: req.body.address,//body is where express stores values sent with a post request
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
          req.flash('success', 'Successfully bought product!');//Store the objects in flash storage and access anywhere.
          req.session.cart = null;
          res.redirect('/');
        });
    });
});

router.post('/upload', function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./public/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send('upload succeeded!');
        });
    });
});

router.get('/uploads/:file', function (req, res){
  var path=require('path');
    file = req.params.file;
    var dirname = path.resolve(".")+'/public/uploads/';
    var img = fs.readFileSync(dirname  + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');

});

router.get('/download', function(req, res) { // create download route
  var path=require('path'); // get path
  var dir=path.resolve(".")+'/public/uploads/'; // give path
    fs.readdir(dir, function(err, list) { // read directory return  error or list
    if (err) return res.json(err);
    else
                res.json(list);
                });
});

router.get('/:file(*)', function(req, res, next){ // this routes all types of file
  var path=require('path');
  var file = req.params.file;
  var path = path.resolve(".")+'/public/uploads/'+file;
  console.log(path);
  res.download(path); // magic of download fuction
});


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {//It is a passport method
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
