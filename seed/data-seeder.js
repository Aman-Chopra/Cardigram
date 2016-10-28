var Patient = require('../models/patient');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/report');

var patients = [
  new Patient({
    user : 'amanchopra64@gmail.com',
    Haemoglobin : 13.4,
    Leucocyte : 6000,
    Neutrophils : 63,
    Lymphocytes: 32,
    Eosinophils: 2,
    Monocytes: 2,
    Cholesterol: 140,
    Triglycerides: 74,
    HDLCholesterol: 40,
    LDLCholesterol: 80,
    VLDLCholesterol: 13,
    LDLHDLCholesterol: 1.8,
    Urea: 30,
    Creatinine: 0.8,
    Sodium: 150,
    Uric: 7,
    Potassium: 5,
    Phosphorous: 2.6,
    Bilirubin: 1.09,
    Alkaline: 82,
    Protein: 8,
    Albumin: 4,
    Gamma: 19,
    Globulin:2.6
    }),
    new Patient({
      user : 'amanchopra64@gmail.com',
      Haemoglobin : 13.7,
      Leucocyte : 6200,
      Neutrophils : 61,
      Lymphocytes: 30,
      Eosinophils: 1.9,
      Monocytes: 1.8,
      Cholesterol: 143,
      Triglycerides: 78,
      HDLCholesterol: 34,
      LDLCholesterol: 81,
      VLDLCholesterol: 12,
      LDLHDLCholesterol: 1.7,
      Urea: 26,
      Creatinine: 0.7,
      Sodium: 123,
      Uric: 6.7,
      Potassium: 5.6,
      Phosphorous: 2.6,
      Bilirubin: 1.14,
      Alkaline: 79,
      Protein: 7,
      Albumin: 3.7,
      Gamma: 20,
      Globulin:2.3
      }),
      new Patient({
        user : 'amanchopra64@gmail.com',
        Haemoglobin : 12.9,
        Leucocyte : 6100,
        Neutrophils : 62,
        Lymphocytes: 37,
        Eosinophils: 1.8,
        Monocytes: 1.7,
        Cholesterol: 120,
        Triglycerides: 77,
        HDLCholesterol: 42,
        LDLCholesterol: 81,
        VLDLCholesterol: 12.7,
        LDLHDLCholesterol: 1.7,
        Urea: 32,
        Creatinine: 0.7,
        Sodium: 143,
        Uric: 6.4,
        Potassium: 4.8,
        Phosphorous: 2.2,
        Bilirubin: 1.02,
        Alkaline: 84,
        Protein: 7,
        Albumin: 4.5,
        Gamma: 18,
        Globulin:2.3
        }),
      ];




      var done = 0;

      for(var i = 0; i < patients.length; i++){
        patients[i].save(function(err , result){
          done++;
          if(done === patients.length){
            exit();
          }
        });//mongoose method to save items to the database
      }

      function exit() {
        mongoose.disconnect();
      }
