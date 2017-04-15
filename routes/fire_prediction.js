var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var mongo = require("./mongo");
var mongoURL = "mongodb://ec2-35-165-223-223.us-west-2.compute.amazonaws.com/CMPE295";
var forEach = require('async-foreach').forEach;
var rfm = [];
var dfm = [];
var rsf = [];
var fireName;
/* GET home page. */

function allDone1(notAborted, arr) {
    console.log("RSF", rsf, notAborted, arr);}
// Generic "done" callback.
function allDone(notAborted, arr) {
    console.log(rfm, notAborted, arr);
    mongo.connect(mongoURL, function () {
            var coll = mongo.collection('Input');
            coll.findOne({"Fire Name":fireName}, function (err, user) {
                if (user) {
                    console.log(user["Aspect"]);
                    var t = user["Time"];
                        mongo.connect(mongoURL, function () {
                            var coll = mongo.collection('Table3b');
                            coll.findOne({"Aspect":user["Aspect"]}, function (err, user1) {
                                if (user1) {
                                    console.log(user1[t]);
                                    for (var i = 0; i < rfm.length; i++)
                                    {
                                        dfm.push( rfm[i] + user1[t] );
                                        // console.log("DFM" + dfm);
                                    }

                                    //Calculating rate of Spread of Fire
                                    mongo.connect(mongoURL, function () {
                                        forEach(dfm, function(item, index, arr) {
                                            var coll = mongo.collection('Table6a');
                                            coll.findOne({"dfm":parseInt(item)}, function (err, user2) {
                                                if (user2) {
                                                    // console.log("Fuel Model" + user2[user['Fuel model']]);
                                                    // console.log("User 2" + user2);
                                                    rsf.push(user2[user['Fuel model']]);
                                                    }
                                                else {
                                                    json_responses={"statusCode": 401, "server": mongoURL};
                                                    console.log(json_responses)
                                                }
                                            });
                                            var done = this.async();
                                            setTimeout(function() {
                                                done();
                                            }, 500);
                                        }, allDone1);
                                    });

                                }
                                else {
                                    json_responses={"statusCode": 401, "server": mongoURL};
                                    console.log(json_responses)
                                }
                            });
                        });

                }
                else {
                    json_responses={"statusCode": 401, "server": mongoURL};
                    console.log(json_responses)
                }
            });
    });
}

router.post('/', function(req, res, next) {
    mongo.connect(mongoURL, function () {
    var temp = req.param("temp");
    var humi = req.param("humi");
    fireName = req.param("name");
    var l = req.param("temp").length;

        forEach(temp, function(item, index, arr) {
            // console.log("each", item, index);
            // console.log('Connected to mongo at: ' + mongoURL);
                        var coll = mongo.collection('Table3a');
                        coll.findOne({"dt":parseInt(item)}, function (err, user) {
                            if (user) {
                                // json_responses={"statusCode": 200, "server": mongoURL, "hello": user.lat};
                                // console.log(user[humi[index]])
                                rfm.push(user[humi[index]]);
                                // res.render('index', { title: 'Express' });
                                // res.send({"status":200,"detail":user});
                            }
                            else {
                                json_responses={"statusCode": 401, "server": mongoURL};
                                console.log(json_responses)
                            }
                        });
            var done = this.async();
            setTimeout(function() {
                done();
            }, 500);
        }, allDone);
    });
});

module.exports = router;


