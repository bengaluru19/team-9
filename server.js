var express = require("express");
var bp = require("body-parser");

var app = express();
app.use(bp.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/reg.html");
});

app.post("/formdata", (req, res) => {
    var inp = {};
    inp.name = req.body.name;
    inp.email = req.body.email;
    inp.phone = req.body.phone;
    console.log(inp);
    res.events = [{name:"paint bottles", city:"bengaluru", date:"07/07/2177", numPeople:"560"},
        {name:"teach english", city:"chennai", date:"43/22/19910", numPeople:"80"}];
    res.render("about.ejs", {events: res.events});
    // write db code here
});

var server = app.listen(3333, () => {
    console.log("Server listening on port", server.address().port);
});

