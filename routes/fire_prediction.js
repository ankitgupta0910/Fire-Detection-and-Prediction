var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var mongo = require("./mongo");
var mongoURL = "mongodb://ec2-35-165-223-223.us-west-2.compute.amazonaws.com/CMPE295";

/* GET home page. */
router.post('/', function(req, res, next) {
    mongo.connect(mongoURL, function () {
    // console.log(req);
    var temp = req.param("temp");
    var humi = req.param("humi");
    console.log("asdfghjkl" + temp[0]);
    console.log(humi[0]);
    var l = req.param("temp").length;
    console.log("LLLLLL" + l);
    for(var i = 0; i < l; i++){
        console.log("In for loop");
        // console.log("Ankit" + temp[i]);
        // console.log("Gupta" + humi[i]);

                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('Table3a');
                coll.findOne({"dt":parseInt(temp[i])}, function (err, user) {
                    if (user) {
                        // json_responses={"statusCode": 200, "server": mongoURL, "hello": user.lat};
                        console.log(user[humi[i]])
                        res.render('index', { title: 'Express' });
                        // res.send({"status":200,"detail":user});
                    }
                    else {
                        json_responses={"statusCode": 401, "server": mongoURL};
                        console.log(json_responses)
                    }
                });
    }
    });
});


// PythonShell.run('/CMPE295B/Janish/object_detection.py', function (err) {
//     if (err) throw err;
//     console.log('finished');
// });


module.exports = router;


