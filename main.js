var fs = require('fs');

var dataset = {};

fs.readFile('luftguete-2014.json', function (err, data) {
  if (err) {
    throw err;
  }

  console.log("Read file");
  console.log("Converting to JSON...");
  dataset = JSON.stringify(data);

  for(var property in dataset){
    console.log(property);
    console.log(dataset[property]["latitude"], dataset[property]["longitude"])

    for(var parameter in dataset[property]){
      console.log(parameter);

      console.log(dataset[property][parameter]);

      var length = dataset[property][parameter].length;
      var average = 0;
      for(var i=0; i<length; i++){
        average += dataset[property][parameter][i]["HMW"];
      }

      average = average/length;
      console.log(average);
    }
  }
});