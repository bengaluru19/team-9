var express = require("express");
var bp = require("body-parser");

var app = express();
app.use(bp.urlencoded({extended: false}));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "careworks"
});

con.connect(function(err) {
  if (err) throw err;
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/reg.html");
});

// app.get('/fetch', function (req, res) {

// 	console.log("HTTP Get Request");
// 	var userReference = firebase.database().ref("/volunteers/");

// 	//Attach an asynchronous callback to read the data
// 	userReference.on("value", 
// 			  function(snapshot) {
// 					console.log(snapshot.val());
// 					res.json(snapshot.val());
// 					userReference.off("value");
// 					}, 
// 			  function (errorObject) {
// 					console.log("The read failed: " + errorObject.code);
// 					res.send("The read failed: " + errorObject.code);
// 			 });
// });

app.post("/fordata", (req, res) => {
    var inp = {};
    inp.id = 2;
    // inp.email = req.body.email;//Email
    // inp.events = '';//Events
    // inp.experience = '';//Experience
    // inp.nos = 9;//nos
    // inp.skill = '';//Skill
    // inp.id = "";//id
    // inp.hours = 0;//Hours
    
    // write db code here
    con.query("SELECT * FROM events", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
});

app.get("/del", (req, res) => {
    var eid = 1;//give the eid here
    var query = `DELETE FROM events where eid = ?`;
    con.query(query, eid, (err, results, fields) => {
        if(err){
            return console.error(err);
        }

        console.log("Deleted Row(s):", results.affectedRows);
    })
})

app.get("/count", (req, res => {
    
}))

var server = app.listen(3333, () => {
    console.log("Server listening on port", server.address().port);
});

