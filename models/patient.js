//The structure of the database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;//Schema is the object of mongoose

var schema = new Schema({
  user : {type: String , required: true},
  Haemoglobin : {type: Number , required: true},
  Leucocyte : {type: Number , required: true},
  Neutrophils : {type: Number , required: true},
  Lymphocytes: {type: Number , required: true},
  Eosinophils: {type: Number , required: true},
  Monocytes: {type: Number , required: true},
  Cholesterol: {type: Number , required: true},
  Triglycerides: {type: Number , required: true},
  HDLCholesterol: {type: Number , required: true},
  LDLCholesterol: {type: Number , required: true},
  VLDLCholesterol: {type: Number , required: true},
  LDLHDLCholesterol: {type: Number , required: true},
  Urea: {type: Number , required: true},
  Creatinine: {type: Number , required: true},
  Sodium: {type: Number , required: true},
  Uric: {type: Number , required: true},
  Potassium: {type: Number , required: true},
  Phosphorous: {type: Number , required: true},
  Bilirubin: {type: Number , required: true},
  Alkaline: {type: Number , required: true},
  Protein: {type: Number , required: true},
  Albumin: {type: Number , required: true},
  Gamma: {type: Number , required: true},
  Globulin: {type: Number , required: true}

});

module.exports = mongoose.model('patient',schema);
