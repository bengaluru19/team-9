var express = require("express");
var bp = require("body-parser");

var app = express();
app.use(bp.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var mysql = require('mysql');
/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "careworks"
});

con.connect(function(err) {
  if (err) throw err;
});
*/
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/reg.html");
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
});


app.get("/admin", (req, res) => {
    var volunteers = [{name:"A", email:"B", phone:"C", events:6, hours:55}];
    var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
/*
    con.query("SELECT * FROM events", function (err, result, fields) {
        if (err) throw err;
        volunteers = JSON.parse(JSON.stringify(result));
    });*/
    var data = {numVols: 0, numEvents: 0, numSchools: 0, volunteers: volunteers, events: events};
    res.render("admin.ejs", data);
});

var server = app.listen(4444, () => {
    console.log("Server listening on port", server.address().port);
});

