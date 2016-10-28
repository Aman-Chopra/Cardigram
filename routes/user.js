//For route grouping
var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();//using protection as a middleware
router.use(csrfProtection);//All the routers are protected using this csrf protection
var fs = require("fs");
var Order = require('../models/order');
var Cart = require('../models/cart');

router.get('/profile', isLoggedIn, function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders: orders });//inbuilt method of csrf package to provide token as to which browser is accessing the server.
    });
});

router.get('/logout', function(req,res){
 req.logOut();
 req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});



router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');//messsages like 'Email' already in use are stored in error of flash
  res.render('user/signup', { title: 'SIGNUP', csrfToken: req.csrfToken() , messages: messages, hasErrors: messages.length > 0});//inbuilt method of csrf package to provide token as to which browser is accessing the server.
});


router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
      var dir = './public/uploads/'+req.user.email;
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        res.redirect('/dashboard');
      }
});



router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');//messsages like 'Email' already in use are stored in error of flash
  res.render('user/signin', { title: 'SIGNIN', csrfToken: req.csrfToken() , messages: messages, hasErrors: messages.length > 0});//inbuilt method of csrf package to provide token as to which browser is accessing the server.
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/dashboard');
    }
});



//get is for retreiving data and post is for writing data

module.exports = router;

//For route protection
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {//It is a passport method
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();//continue
    }
    res.redirect('/');
}
