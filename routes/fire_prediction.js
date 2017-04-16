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
var tcf = [];
var wf = [];
var fli = [];
var afli = [];
var fl = [];
var arsf = [];
var fsd = [];
var ewsf = [];
var fireName;
var sp;
var midwisp = [];
var wisp;
var fm;
var sf;
var pt;
/* GET home page. */
function allDone4(notAborted, arr) {
    console.log("Flame Length" + fl);
    for (var m = 0; m < arsf.length; m++)
    {
        fsd.push(Math.round(arsf[m] * pt));
    }
    console.log("Forward" + fsd);
}

function allDone3(notAborted, arr) {
    // console.log("FLI" + fli);
    for (var l = 0; l < fli.length; l++)
    {
        afli.push(Math.round(fli[l] * tcf[l]));
        ewsf.push(Math.floor(tcf[l] - 1));
    }
console.log("Effective" + ewsf);
    mongo.connect(mongoURL, function () {
        forEach(afli, function(item, index, arr) {
            var coll = mongo.collection('Table6c');
            coll.findOne({"afi":parseInt(item)}, function (err, user6) {
                if (user6) {
                    fl.push(user6['fl']);
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
        }, allDone4);
    });

    // console.log(afli);
    }

function allDone2(notAborted, arr) {
    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('Table5b');
        coll.findOne({"sp":sp}, function (err, user4) {
            if (user4) {
                sf = user4[fm];
                for (var k = 0; k < wf.length; k++)
                {
                    tcf.push(wf[k] + sf + 1);
                    arsf.push(rsf[k] * (wf[k] + sf + 1));
                }

                mongo.connect(mongoURL, function () {
                    forEach(dfm, function(item, index, arr) {
                        var coll = mongo.collection('Table6b');
                        coll.findOne({"dfm":parseInt(item)}, function (err, user5) {
                            if (user5) {
                                // console.log("Fuel Model" + user2[user['Fuel model']]);
                                // console.log("User 2" + user2);
                                fli.push(user5[fm]);
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
                    }, allDone3);
                });

                // console.log(sf);
            }
        });
    });
}

function allDone1(notAborted, arr) {
    // console.log("RSF", rsf, notAborted, arr);
    mongo.connect(mongoURL, function () {
            var coll = mongo.collection('Table4a');
        coll.findOne({"fm":fm}, function (err, user3) {
            if (user3) {
                    // console.log(user3);
                    for(var j = 0; j < wisp.length; j++)
                    {
                        // console.log(wisp[j]);
                    midwisp.push(Math.round(wisp[j] * user3['af']));
                    }
                    // console.log(midwisp);

                    mongo.connect(mongoURL, function () {
                        forEach(midwisp, function(item, index, arr) {
                            var coll = mongo.collection('Table4b');
                            coll.findOne({"mw":parseInt(item)}, function (err, user4) {
                                if (user4) {
                                    // console.log("Fuel Model" + user2[user['Fuel model']]);
                                    // console.log("User 2" + user2);
                                    wf.push(user4[fm]);
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
                        }, allDone2);
                    });

                }
                else {
                    json_responses={"statusCode": 401, "server": mongoURL};
                    console.log(json_responses)
                }
            });
    });
    // res.render('fire_prediction', { rsf: 'rsf' });

}
// Generic "done" callback.
function allDone(notAborted, arr) {
    // console.log(rfm, notAborted, arr);
    mongo.connect(mongoURL, function () {
            var coll = mongo.collection('Input');
            coll.findOne({"Fire Name":fireName}, function (err, user) {
                if (user) {
                    // console.log(user["Aspect"]);
                    fm = user["Fuel model"];
                    sp = user["Slope percent"];
                    pt = user["Projection Time"];
                    var t = user["Time"];
                        mongo.connect(mongoURL, function () {
                            var coll = mongo.collection('Table3b');
                            coll.findOne({"Aspect":user["Aspect"]}, function (err, user1) {
                                if (user1) {
                                    // console.log(user1[t]);
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
                                                    console.log("Ankit" + json_responses)
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
    wisp = req.param("wisp");
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
                                //
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


