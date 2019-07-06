var express = require("express");
var bp = require("body-parser");

var app = express();
app.use(bp.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/reg.html");
});

app.post("/formdata", (req, res) => {
    var inp = {};
    inp.name = req.body.name;
    inp.email = req.body.email;
    inp.phone = req.body.phone;
    console.log(inp);

    // write db code here
});

var server = app.listen(3333, () => {
    console.log("Server listening on port", server.address().port);
});

