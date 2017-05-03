var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"
var PythonShell = require('python-shell');

var chunk;
var mongo = require("./mongo");
//var mongoURL = "mongodb://ec2-52-72-105-67.compute-1.amazonaws.com:27017/login";
var mongoURL = "mongodb://ec2-35-165-223-223.us-west-2.compute.amazonaws.com/CMPE295";


/* GET home page. */
router.get('/', function(req, res, next) {


    var json_responses;

    // mongo.connect(mongoURL, function () {
    //     console.log('Connected to mongo at: ' + mongoURL);
    //     var coll = mongo.collection('cafire');
    //
    //     coll.findOne({}, function (err, user) {
    //         if (user) {
    //
    //             json_responses={"statusCode": 200, "server": mongoURL, "hello": user.item};
    //             // res.send(json_responses)
    //             console.log(json_responses)
    //         }
    //         else {
    //             json_responses={"statusCode": 401, "server": mongoURL};
    //             // res.send(json_responses)
    //             console.log(json_responses)
    //         }
    //     });
    // });
    res.render('index', { title: 'Express' });
});

router.get('/graphs', function(req, res, next) {
    res.render('graphpage', { title: 'Express' });
});

router.post('/signin', function(req, res, next) {
    var json_responses;
    var user = req.param("user");
    email=user.email;
    password=user.password;
    console.log(user)
    if (email == "tech@spartans" && password == "techsp")
    {res.send({ title: 'express', status : 200});}
});

module.exports = router;


