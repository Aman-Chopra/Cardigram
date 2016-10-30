var express = require('express');
var router = express.Router();
//For route grouping
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
/* GET home page. */
//var products = Product.find();finding is asynchronous so we require a callback
var Product = require('../models/product');//importing product model
var Customer = require('../models/customer');
var Patient = require('../models/patient');
var fs   = require("fs");
var csv = require('ya-csv');
var driverChunks = [];

router.get('/', function(req, res, next) {
  Product.find(function(err , docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i+=chunkSize){
      productChunks.push(docs.slice(i , i+chunkSize));
    }
    res.render('shop/index', { title: 'Cardigram' , products: productChunks});
  });
});

router.post('/name',isLoggedIn, function (req, res) {
    Customer.find(function(err, docs){
      var j = 0;
      for(var i = 0; i < docs.length; i++){
        if(docs[i]._id==req.body.selected[j]){
        driverChunks.push(docs[i]);
        j++;
      }
      }
      console.log(driverChunks);
    })
  });


  router.post('/appendcsv', isLoggedIn,function (req, res) {
      var csvChunks = [];
        for(var i = 0; i < req.body.myArray.length; i++){
          csvChunks.push(req.body.myArray[i]);
        }
        var w = csv.createCsvFileWriter('./new_data.csv', {'flags': 'a'});
        /*var data = [];
        for(key in csvChunks) {
        if(typeof csvChunks[key] !== 'function'){
            //data.push(key);
            data.push(csvChunks[key]);
        }
      }*/

        w.writeRecord(csvChunks);
        csvChunks = [];
    });


    router.post('/storedata', isLoggedIn,function (req, res) {
      var patient = new Patient({
      user: req.user.email,
      Haemoglobin : req.body.myArray[0],
      Leucocyte : req.body.myArray[1],
      Neutrophils : req.body.myArray[2],
      Lymphocytes: req.body.myArray[3],
      Eosinophils: req.body.myArray[4],
      Monocytes: req.body.myArray[5],
      Cholesterol: req.body.myArray[6],
      Triglycerides: req.body.myArray[7],
      HDLCholesterol: req.body.myArray[8],
      LDLCholesterol: req.body.myArray[9],
      VLDLCholesterol: req.body.myArray[10],
      LDLHDLCholesterol: req.body.myArray[11],
      Urea: req.body.myArray[12],
      Creatinine: req.body.myArray[13],
      Sodium: req.body.myArray[14],
      Uric: req.body.myArray[15],
      Potassium: req.body.myArray[16],
      Phosphorous: req.body.myArray[17],
      Bilirubin: req.body.myArray[18],
      Alkaline: req.body.myArray[19],
      Protein: req.body.myArray[20],
      Albumin: req.body.myArray[21],
      Gamma: req.body.myArray[22],
      Globulin: req.body.myArray[23]
      });

      patient.save(function(err, result) {
          req.flash('success', 'Successfully bought product!');//Store the objects in flash storage and access anywhere.

        });

      });




  router.get('/signin', function(req, res, next) {
      res.redirect('/user/signin');
    });

    router.get('/userprofile', isLoggedIn,function(req, res, next) {
      var successMsg = req.flash('success')[0];
        var a = "imagefiles/";
        var b = req.user._id;
        var c = ".png";
        var photo = a+b+c;
        res.render('shop/profile', { title: 'Profile', Name: req.user.email, Photo:photo , successMsg: successMsg , noMessages: !successMsg});
      });


router.get('/dashboard', isLoggedIn,function(req, res, next) {
    res.render('shop/dashboard', { title: 'Dashboard', Name: req.user.email});
  });

  router.get('/gensini', isLoggedIn,function(req, res, next) {
      res.render('shop/gensini', { title: 'Gensini', Name: req.user.email});
    });

    router.get('/uploaddata', isLoggedIn, function(req, res, next) {
        res.render('shop/uploaddata', { title: 'Upload-data', Name: req.user.email});
      });


router.get('/table', isLoggedIn, function (req, res, next) {
    Patient.find(function(err, docs){
      var haematology = [];

      for(var i = 0; i < docs.length; i++){
        if(req.user.email==docs[i].user){

        haematology.push(docs.slice(i,i+1));

      }
    }
    console.log(haematology);
    console.log(haematology.length);
    var length = haematology.length;
      res.render('shop/table', { title: 'Tables' , haematology: haematology, Name: req.user.email, Length: length});
  });
});




router.get('/getcharts',isLoggedIn, function (req, res, next) {
  Patient.find(function(err, docs){
    var patientChunk = [];
    for(var i = 0; i < docs.length; i++){
      if(docs[i].user==req.user.email){
      patientChunk.push(docs.slice(i,i+1));
    }
    }

      res.render('shop/charts', { title: 'Charts', Name: req.user.email, Length:patientChunk.length });
      });
  });

  router.get('/report',isLoggedIn, function (req, res, next) {
        res.render('shop/report', { title: 'Report', Name: req.user.email});
    });




router.get('/charts', isLoggedIn,function (req, res, next) {
    Patient.find(function(err, docs){
      var patientChunks = [];
      for(var i = 0; i < docs.length; i++){
        if(docs[i].user==req.user.email){
        patientChunks.push(docs.slice(i,i+1));
      }
      }
      var jsonObj = {
        data : [],
        data1 : [],
        data2 : [],
        data3 : [],
        data4 : [],
        data5 : [],
        data6 : [],
        data7 : []

    };
    var temp = {
    labels : [],
    series : [[]]
  }
      for(var i =0;i<3;i++)
      temp.series[i] = new Array();
      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Leucocyte"];
          var a = 4000;
          var b = 11000;
          temp.series[0].push(temp1);
          temp.series[1].push(a);
          temp.series[2].push(b);
          console.log(temp);
          jsonObj.data.push(temp);

      }
      var temp = {
      labels : [],
      series : [[]]
    }

    for(var i =0;i<2;i++)
    temp.series[i] = new Array();
      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Haemoglobin"];
          temp.series[0].push(temp1);
          var a = 14;
          temp.series[1].push(a);
          console.log(temp);
          jsonObj.data1.push(temp);

      }

      var temp = {
      labels : [],
      series : [[]]
    }

    //for(var i =0;i<2;i++)
    //temp.series[i] = new Array();
      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Triglycerides"];
          temp.series[0].push(temp1);
          console.log(temp);
          jsonObj.data2.push(temp);

      }

      var temp = {
      labels : [],
      series : [[]]
    }


      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Cholesterol"];
          temp.series[0].push(temp1);
          console.log(temp);
          jsonObj.data3.push(temp);

      }

      var temp = {
      labels : [],
      series : [[]]
    }


      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Urea"];
          temp.series[0].push(temp1);
          console.log(temp);
          jsonObj.data4.push(temp);

      }

      var temp = {
      labels : [],
      series : [[]]
    }

    for(var i =0;i<2;i++)
    temp.series[i] = new Array();
      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Sodium"];
          temp.series[0].push(temp1);
          var a = 145;
          temp.series[1].push(a);
          console.log(temp);
          jsonObj.data5.push(temp);

      }

      var temp = {
      labels : [],
      series : [[]]
    }


      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Protein"];
          temp.series[0].push(temp1);
          console.log(temp);
          jsonObj.data6.push(temp);

      }

      var temp = {
      labels : [],
      series : [[]]
    }


      for(var i = 0; i < patientChunks.length; i++) {
          temp.labels.push(i+1);
          var temp1 = patientChunks[i][0]["Alkaline"];
          temp.series[0].push(temp1);
          console.log(temp);
          jsonObj.data7.push(temp);

      }


      console.log(jsonObj);
      var toBeSentData = JSON.stringify(jsonObj);
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(toBeSentData);
      console.log("string sent");
  });
});


  router.get('/name', isLoggedIn,function (req, res) {
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
    var cart = new Cart(req.session.cart ?  req.session.cart : {});

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
      var a = req.user.email;




        var fstream = fs.createWriteStream('./public/uploads/' +a+'/'+ filename);
        file.pipe(fstream);
        fstream.on('close', function () {
          res.redirect('/report');
        });
    });
});

router.post('/photoupload', function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {


      var a = filename;
      var b = a.indexOf('.');
      var l = a.length;
      //var c = a.substring(b,l);
      var c = ".png";
      var d = req.user._id;
      var e = d+c;



        var fstream = fs.createWriteStream('./public/images/' + e);
        file.pipe(fstream);
        req.flash('success', 'Successfully update profile picture!');
        fstream.on('close', function () {
          res.redirect('/userprofile');
        });
    });
});





/*router.post('/upload', function(req, res) {
  var busboy = new Busboy({ headers: req.headers });
  var files = 0, finished = false;
  busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
    ++files;
    var fstream = fs.createWriteStream('./public/uploads/' + filename);
    fstream.on('finish', function() {
      if (--files === 0 && finished) {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("");
      }
    });
    file.pipe(fstream);
  });
  busboy.on('finish', function() {
    finished = true;
  });
  return req.pipe(busboy);
  res.redirect('/report');
});*/

router.get('/uploads/:file',isLoggedIn, function (req, res){
  var path=require('path');
    file = req.params.file;
    var a = req.user.email;
    var dirname = path.resolve(".")+'/public/uploads/'+a+'/';
    var img = fs.readFileSync(dirname  + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');

});

router.get('/download', isLoggedIn,function(req, res) { // create download route
  var path=require('path'); // get path
  var a = req.user.email;
  var dir=path.resolve(".")+'/public/uploads/'+a+'/'; // give path
    fs.readdir(dir, function(err, list) { // read directory return  error or list
    if (err) return res.json(err);
    else{
                res.json(list);
              }
                });
});

router.get('/:file(*)', function(req, res, next){ // this routes all types of file
  var path=require('path');
  var a = req.user.email;
  var file = req.params.file;
  var path = path.resolve(".")+'/public/uploads/'+a+'/'+file;
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
