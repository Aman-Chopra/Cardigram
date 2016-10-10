var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
/* GET home page. */
//var products = Product.find();finding is asynchronous so we require a callback
var Product = require('../models/product');//importing product model
var Order = require('../models/order');

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


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {//It is a passport method
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
