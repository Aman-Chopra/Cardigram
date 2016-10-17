var csv = require('ya-csv');
var w = csv.createCsvFileWriter('new_data.csv', {'flags': 'a'});
var dictionary = [
  34,44,34
];

var data = [];
for(key in dictionary) {
if(typeof dictionary[key] !== 'function'){
    //data.push(key);
    data.push(dictionary[key]);
}
}

w.writeRecord(data);
