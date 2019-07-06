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

var volunteers = 0
app.get("/", (req, res) => {
    var inp = {};
    inp.id = volunteers;
    volunteers += 1;
    inp.name = req.body.name;
    inp.email = req.body.email;
    inp.phone = req.body.phone;
    console.log(inp);
    res.events = [{name:"paint bottles", city:"bengaluru", date:"07/07/2177",activity:"hi", numPeople:"560"},
        {name:"teach english", city:"chennai", date:"43/22/19910",activity:"hllo", numPeople:"80"}];
    res.render("about.ejs", {events: res.events});
    // write db code here
});

app.get("/register", (req, res) => {
    res.render("register.ejs", []);
});

app.post("/logindata", (req, res) => {
    if(req.body.name === "admin" && req.body.password === "admin") {
        var volunteers = [{name:"A", email:"B", phone:"C", events:6, hours:55}];
        var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
        /*
        con.query("SELECT * FROM events", function (err, result, fields) {
            if (err) throw err;
            volunteers = JSON.parse(JSON.stringify(result));
        });*/
        var data = {numVols: 0, numEvents: 0, numSchools: 0, volunteers: volunteers, events: events};
        res.render("admin.ejs", data);
    }
    else {
        res.render("register.ejs", {errmsg:""});
    }
});

app.post("/registerdata", (req, res) => {
    console.log(req.body);
    /*
    var newvol = []
    con.query("SELECT * FROM events where email=" + req.body.email, function (err, result, fields) {
        if (err) throw err;
        newvol = JSON.parse(JSON.stringify(result));
    });
    if(newvol.length > 0)
        res.render("register.ejs", {errmsg:"This email id already exists!"});
    */
    res.render("volunteer.ejs", {errsg:""});
});

app.get("/volunteer", (req, res) => {
    var volunteer = {name:"A", email:"B", phone:"C", events:6, hours:55};
    var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
    var nevents = [{name:"MA", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];

    var data = {volunteer: volunteer, events: events, newEvents: nevents};
    res.render("volunteer.ejs", data);
});

app.get("/admin", (req, res) => {
    var volunteers = [{name:"A", email:"B", phone:"C", events:6, hours:55}];
    var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
/*
    con.query("SELECT * FROM events", function (err, result, fields) {
        if (err) throw err;
        volunteers = JSON.parse(JSON.stringify(result));
    });*/
    var data = {numVols: 2700, numEvents: 54, numSchools: 19, volunteers: volunteers, events: events};
    res.render("admin.ejs", data);
});

var server = app.listen(5000, () => {
    console.log("Server listening on port", server.address().port);
});

