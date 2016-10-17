var R = require("r-script");
/*var out = R("Ontology.R")
  .callSync();

console.log(out);*/
R("Ontology.R")
  .call(function(err, d) {
    if (err) throw err;
    console.log(d);
  });
