var express = require('express');
var router = express.Router();

var mongo = require("./mongo");
var mongoURL = "mongodb://ec2-35-165-223-223.us-west-2.compute.amazonaws.com/CMPE295";


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('maps');
});

router.get('/getlatlong', function(req, res, next) {
console.log("Hello maps");
    var json_responses;

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('images');

        coll.find({}).toArray(function (err, user) {
            if (user) {

                json_responses={"statusCode": 200, "server": mongoURL, "hello": user.lat};
                // res.send(json_responses)
                console.log(user)
                res.send({"status":200,"detail":user});
            }
            else {
                json_responses={"statusCode": 401, "server": mongoURL};
                // res.send(json_responses)
                console.log(json_responses)
            }
        });
    });
    // res.render('maps');
});



module.exports = router;


