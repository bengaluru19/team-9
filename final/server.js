var express = require("express");
var bp = require("body-parser");
const { Parser } = require('json2csv');

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


var volunteers = 0, eid=0, vid=0;

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
        data = {numVols: 230, numEvents: 5, numSchools: 10, volunteers: volunteers, events: events};
        res.render("admin.ejs", data);
    }
    // check if valid uname/pwd in database
    // if yes, get details
    // if no current event
    // res.render("volunteer.ejs", details)
    // else res.render("volevent.ejs", details)
    // if event done res.render("volend.ejs", details)
    
    // else register 
    res.render("register.ejs", {});
});


app.post("/registerdata", (req, res) => {
    console.log(req.body);
    var newvol = []
    con.query("SELECT * FROM events where email=" + req.body.email, function (err, result, fields) {
        if (err) throw err;
        newvol = JSON.parse(JSON.stringify(result));
        if(newvol.length > 0)
        res.render("register.ejs", {err:{msg:"This email id already exists!"}});
        else {
            console.log()
            var name = req.body.email;
            var phone = parseInt(req.body.phone);
            var email = req.body.name;
            var place = req.body.place;
            var skills = req.body.skills;
            var exp = req.body.experience;
            var pwd = req.body.pwd;
            var query = "INSERT INTO volunteers(email, phone, place, skills, experience, password, name) VALUES(?,?,?,?,?,?,?)";
            con.query(query, [email, phone, place, skills, exp, pwd, name], (err, results, fields) => {
                if(err)
                {
                    console.error(err.message);
                }
                else{
                    console.log("Successfully inserted the data into table volunteers");
                }
            })
        }
        res.render("register.ejs", {});
    });
});

app.get("/volunteer", (req, res) => {
    var volunteer = {name:"A", email:"B", phone:"C", events:6, hours:55};
    var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
    var nevents = [{name:"MA", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];

    var voldata = {volunteer: volunteer, events: events, newEvents: nevents};
    res.render("volunteer.ejs", JSON.parse(JSON.stringify(voldata)));
});

app.get("/volevent", (req, res) => {
    var volunteer = {name:"A", email:"B", phone:"C", events:6, hours:55};
    var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
    var nevents = [{name:"MA", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];

    var voldata = {volunteer: volunteer, events: events, newEvents: nevents};
    res.render("volevent.ejs", JSON.parse(JSON.stringify(voldata)));
});

app.get("/volend", (req, res) => {
    var volunteer = {name:"A", email:"B", phone:"C", events:6, hours:55};
    var events = [{name:"FP", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];
    var nevents = [{name:"MA", city:"Bengaluru", date:"27/07/27", activity:"Finger painting", numPeople: 80}];

    voldata = {volunteer: volunteer, events: events, newEvents: nevents};
    res.render("volend.ejs", JSON.parse(JSON.stringify(voldata)));
});

app.post("/addevent", (req, res) => {
    // add event data and volunteer data to database
    // use voldata to get voldata
    //res.render("volunteer.ejs", JSON.parse(JSON.stringify(voldata)));
    res.render("regevent.ejs", {});
});

function getAdminPage(res) {
    var events = [];
    var volunteers = [];

    // SQL code to retrieve event and volunteers 
    var query = `SELECT * FROM events`;
    var query2 = `SELECT * FROM volunteers`;
    con.query(query, (err, results, fields) => {
        events = JSON.parse(JSON.stringify(results));
    })
    con.query(query2, (err, results, fields) => {
        volunteers = JSON.parse(JSON.stringify(results));
    })

    var data = {numVols: volunteers.length, numEvents: events.length, numSchools: 19, volunteers: volunteers, events: events};
    console.log("here");
    console.log(volunteers);
    res.render("admin.ejs", data);
}

app.post("/neweventdata", (req, res) => {
    // SQL code here *********************************************************
    var query = "INSERT INTO events(name,location,date,nos,requirednos) VALUES(?,?,?,?,?)";
    con.query(query, [req.body.name, req.body.city, req.body.date, 0, req.body.reqvol], (err, results, fields) => {
        if(err)
        {
            return console.error(err.message);
        }
        console.log("Successfully inserted the new event data!");
        // getAdminPage(res);
    var events = [];
    var volunteers = [];

    // SQL code to retrieve event and volunteers 
    var query = `SELECT * FROM events`;
    var query2 = `SELECT * FROM volunteers`;
    con.query(query, (err, results, fields) => {
        events = JSON.parse(JSON.stringify(results));
        con.query(query2, (err, results, fields) => {
            volunteers = JSON.parse(JSON.stringify(results));
            var data = {numVols: volunteers.length, numEvents: events.length, numSchools: 19, volunteers: volunteers, events: events};
            console.log("here");
            console.log(volunteers);
            res.render("admin.ejs", data);
            })
        })
    })
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

app.get("/searchvol", (req, res) => {
    // console log SQL
    var query = "SELECT * FROM volunteers WHERE email = ?";
    console.log(req.query);
    const fields = ['email', 'phone', 'place'];
    const opts = {fields, delimiter : "\t"};
    con.query(query, req.query.volname, (err, results, fields) => {
        try{
            const parser = new Parser(opts);
        const obj = parser.parse(results);
        res.set('Content-Type', 'application/octet-stream');
        res.send(obj);
        }
        catch(err)
        {
            console.error(err);
        }
    })
    var volname = req.body.volname;
});

app.get("/searcheve", (req, res) => {
    // console log SQL
    var query = `SELECT * FROM events WHERE name = ?`;
    console.log(req.query);
    con.query(query, req.query.evename, (err, results, fields) => {
        console.log(results);
    })
    var evename = req.body.evename;
});

var server = app.listen(5000, () => {
    console.log("Server listening on port", server.address().port);
});

