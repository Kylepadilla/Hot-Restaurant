// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
    {
      id: "1",
      name: "Kyle",
      email: "kyle@gmail.com",
      phone: 867-5309,
    },
    {
      id: "2",
      name: "Anne",
      email: "anne@gmail.com",
      phone: 867-5308,
    },
    {
      id: "3",
      name: "KyAnn",
      email: "kyann@gmail.com",
      phone: 867-5307,
    },
    {
        id: "4",
        name: "Heather",
        email: "heather@gmail.com",
        phone: 867-5306,
      },
  ];

//make array var waittables for tables more than 5 

var waitlist = [];



// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});
  
app.get("/add", function(req, res) {
res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
return res.json(tables);
});
  
// Displays a single character, or returns false
app.get("/api/tables/:tables", function(req, res) {
var chosen = req.params.table;

console.log(chosen);

for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
    return res.json(tables[i]);
    }
}

return res.json(false);
});
  
  // Create New Characters - takes in JSON input
  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newtable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  
    console.log(newtable);
    //if the array has 5 or more

    if(tables.length > 5) {
        waitlist.push(newtable);
    }
    else {
        tables.push(newtable);
    }
  
    tables.push(newtable);
  
    res.json(newtable);
  });

  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  