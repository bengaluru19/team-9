var express = require("express");
var bp = require("body-parser");
var firebase = require('firebase');

var config = {
    apiKey: "",
    authDomain: "careworks-b683b.firebaseapp.com",
    databaseURL: "https://careworks-b683b.firebaseio.com",
    projectId: "careworks-b683b",
    storageBucket: "careworks-b683b.appspot.com",
    messagingSenderId: "575148253636",
    appId: "1:575148253636:web:4e2d2181cb257653"
};
firebase.initializeApp(config);

var app = express();
app.use(bp.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

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

app.get('/fetch', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/volunteers/");

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
});


var volunteers = 0
app.post("/formdata", (req, res) => {
    var inp = {};
    inp.id = volunteers;
    volunteers += 1;
    inp.name = req.body.name;
    inp.email = req.body.email;
    inp.phone = req.body.phone;
    console.log(inp);
    res.events = [{name:"paint bottles", city:"bengaluru", date:"07/07/2177", numPeople:"560"},
        {name:"teach english", city:"chennai", date:"43/22/19910", numPeople:"80"}];
    res.render("about.ejs", {events: res.events});
    // write db code here
    var refpath = '/volunteers/' + inp.id + '/';
    console.log(inp);
    firebase.database().ref(refpath)
    .set(inp ,(err) => {
         if(err)
         console.log(err)
    });
});


app.get("/admin", (req, res) => {
    var volunteers;

    con.query("SELECT * FROM events", function (err, result, fields) {
        if (err) throw err;
        volunteers = JSON.parse(JSON.stringify(result));
    });
    var data = {numVols: 0, numEvents: 0, numSchools: 0, volunteers: volunteers};
    res.render("admin.ejs", data);
});

var server = app.listen(4444, () => {
    console.log("Server listening on port", server.address().port);
});

