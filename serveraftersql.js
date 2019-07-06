var express = require("express");
var bp = require("body-parser");

var app = express();
app.use(bp.urlencoded({extended: false}));

var firebase = require('firebase');

firebase.initializeApp(config);

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

app.post("/formdata", (req, res) => {
    var inp = {};
    inp.id = 2;
    // inp.email = req.body.email;//Email
    // inp.events = '';//Events
    // inp.experience = '';//Experience
    // inp.nos = 9;//nos
    // inp.skill = '';//Skill
    // inp.id = "";//id
    // inp.hours = 0;//Hours
    var refpath = '/volunteers/' + inp.id + '/';
    console.log(inp);
    firebase.database().ref(refpath)
    .set({email:"hello2@email.com"
     },(err)=>{
         if(err)
         console.log(err)
     }
     );
    // write db code here
});

var server = app.listen(3333, () => {
    console.log("Server listening on port", server.address().port);
});

