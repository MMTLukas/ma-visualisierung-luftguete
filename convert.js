var csv = require("fast-csv");
var fs = require('fs');

var dataset = {};

csv.fromPath("luftguete-2014.csv", {
  headers: true,
  delimiter: ";"
}).on("data", function (data) {
  var location = data["Messort"]

  // Init place at object
  if (!dataset[data["Messort"]]) {
    console.log("Current location: " + location);
    dataset[location] = {}
    dataset[location]["latitude"] = data["LATITUDE"];
    dataset[location]["longitude"] = data["LONGITUDE"];
  } else {
    var parameter = data["Parameter"];

    //  Init parameter for place
    if(!dataset[location][parameter]){
      dataset[location][parameter] = [];
    }

    dataset[location][parameter].push({
      timestamp: data["Zeitpunkt"],
      HMW: data["HMW"]
    });

  }
}).on("end", function () {

  fs.writeFile("luftguete-2014.json", JSON.stringify(dataset), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  console.log("done");
});