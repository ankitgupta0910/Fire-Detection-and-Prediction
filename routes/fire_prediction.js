var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var mongo = require("./mongo");
var mongoURL = "mongodb://ec2-35-165-223-223.us-west-2.compute.amazonaws.com/CMPE295";
var forEach = require('async-foreach').forEach;
var reference_Fuel_Moisture = [];
var dead_Fuel_Moisture = [];
var rate_Of_Spread_Fire = [];
var total_Correction_Factor = [];
var wind_Factor = [];
var fire_Line_Intensity = [];
var adjusted_Fire_Line_Intensity = [];
var flame_Length = [];
var adjusted_Rate_Of_Spread_Fire = [];
var forward_Spread_Distance = [];
var effective_Wind_Speed_Factor = [];
var effective_Wind_Speed = [];
var area_For_Point_Source_Fire = [];
var perimeter_For_Point_Source_Fire = [];
var average_effective_Wind_Speed_Factor;
var fireName;
var sp;
var midwisp = [];
var wisp;
var fm;
var sf;
var pt;
/* GET home page. */
function allDone7(notAborted, arr) {
    console.log("Perimeter for point source fire" + perimeter_For_Point_Source_Fire);
}

function allDone6(notAborted, arr) {
    console.log("Area for point source fire" + area_For_Point_Source_Fire);
    mongo.connect(mongoURL, function () {
        forEach(forward_Spread_Distance, function(item, index, arr) {
            var coll = mongo.collection('Table7c');
            coll.findOne({"fsd":parseInt(item)}, function (err, user9) {
                if (user9) {
                    perimeter_For_Point_Source_Fire.push(user9[average_effective_Wind_Speed_Factor]);
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
        }, allDone7);
    });
}


function allDone5(notAborted, arr) {
    // console.log("Effective Wind Speed" + effective_Wind_Speed);
    var sum = 0;
    for( var n = 0; n < effective_Wind_Speed_Factor.length; n++ ){
        sum += parseInt(effective_Wind_Speed_Factor[n]); //don't forget to add the base
    }
    average_effective_Wind_Speed_Factor = Math.floor(sum/effective_Wind_Speed_Factor.length)%2 == 0?Math.floor(sum/effective_Wind_Speed_Factor.length)-1:Math.floor(sum/effective_Wind_Speed_Factor.length);
    mongo.connect(mongoURL, function () {
        forEach(forward_Spread_Distance, function(item, index, arr) {
            var coll = mongo.collection('Table7b');
            coll.findOne({"sdc":parseInt(item)}, function (err, user8) {
                if (user8) {
                    area_For_Point_Source_Fire.push(user8[average_effective_Wind_Speed_Factor]);
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
        }, allDone6);
    });

}

function allDone4(notAborted, arr) {
    // console.log("Flame Length" + flame_Length);
    for (var m = 0; m < adjusted_Rate_Of_Spread_Fire.length; m++)
    {
        forward_Spread_Distance.push(Math.round(adjusted_Rate_Of_Spread_Fire[m] * pt));
    }
    // console.log("Forward" + forward_Spread_Distance);
    mongo.connect(mongoURL, function () {
        forEach(effective_Wind_Speed_Factor, function(item, index, arr) {
            var coll = mongo.collection('Table7a');
            coll.findOne({"esf":parseInt(item)}, function (err, user7) {
                if (user7) {
                    effective_Wind_Speed.push(user7[fm]);
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
        }, allDone5);
    });
}

function allDone3(notAborted, arr) {
    // console.log("fire_Line_Intensity" + fire_Line_Intensity);
    for (var l = 0; l < fire_Line_Intensity.length; l++)
    {
        adjusted_Fire_Line_Intensity.push(Math.round(fire_Line_Intensity[l] * total_Correction_Factor[l]));
        effective_Wind_Speed_Factor.push(Math.floor(total_Correction_Factor[l])%2 == 0?Math.floor(total_Correction_Factor[l])-1:Math.floor(total_Correction_Factor[l]));
    }
// console.log("Effective" + effective_Wind_Speed_Factor);
    mongo.connect(mongoURL, function () {
        forEach(adjusted_Fire_Line_Intensity, function(item, index, arr) {
            var coll = mongo.collection('Table6c');
            coll.findOne({"afi":parseInt(item)}, function (err, user6) {
                if (user6) {
                    flame_Length.push(user6['fl']);
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

    // console.log(adjusted_Fire_Line_Intensity);
    }

function allDone2(notAborted, arr) {
    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('Table5b');
        coll.findOne({"sp":sp}, function (err, user4) {
            if (user4) {
                sf = user4[fm];
                for (var k = 0; k < wind_Factor.length; k++)
                {
                    // console.log("rate_Of_Spread_Fire[k]" + rate_Of_Spread_Fire[k])
                    // console.log("wind_Factor" + wind_Factor[k])
                    // console.log(sf)
                    // console.log()
                    total_Correction_Factor.push(wind_Factor[k] + sf + 1);
                    adjusted_Rate_Of_Spread_Fire.push(rate_Of_Spread_Fire[k] * (wind_Factor[k] + sf + 1));
                }

                mongo.connect(mongoURL, function () {
                    forEach(dead_Fuel_Moisture, function(item, index, arr) {
                        var coll = mongo.collection('Table6b');
                        coll.findOne({"dfm":parseInt(item)}, function (err, user5) {
                            if (user5) {
                                // console.log("Fuel Model" + user2[user['Fuel model']]);
                                // console.log("User 2" + user2);
                                fire_Line_Intensity.push(user5[fm]);
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
    // console.log("rate_Of_Spread_Fire", rate_Of_Spread_Fire, notAborted, arr);
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
                                    wind_Factor.push(user4[fm]);
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
    // res.render('fire_prediction', { rate_Of_Spread_Fire: 'rate_Of_Spread_Fire' });

}
// Generic "done" callback.
function allDone(notAborted, arr) {
    // console.log(reference_Fuel_Moisture, notAborted, arr);
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
                                    for (var i = 0; i < reference_Fuel_Moisture.length; i++)
                                    {
                                        dead_Fuel_Moisture.push( reference_Fuel_Moisture[i] + user1[t] );
                                        // console.log("dead_Fuel_Moisture" + dead_Fuel_Moisture);
                                    }

                                    //Calculating rate of Spread of Fire
                                    mongo.connect(mongoURL, function () {
                                        forEach(dead_Fuel_Moisture, function(item, index, arr) {
                                            var coll = mongo.collection('Table6a');
                                            coll.findOne({"dfm":parseInt(item)}, function (err, user2) {
                                                if (user2) {
                                                    // console.log("Fuel Model" + user2[user['Fuel model']]);
                                                    // console.log("User 2" + user2);
                                                    rate_Of_Spread_Fire.push(user2[user['Fuel model']]);
                                                    }
                                                else {
                                                    json_responses={"statusCode": 401, "server": mongoURL};
                                                    // console.log("Ankit" + json_responses)
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
                                reference_Fuel_Moisture.push(user[humi[index]]);
                                // res.send({ title: 'rate_Of_Spread_Fire' });
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

router.post('/renderPage', function(req, res, next) {
    res.send({ title: 'detected_'});
});


router.get('/renderRealPage', function(req, res, next) {
    res.render('fire_prediction',{ title: 'detected_'});
});
module.exports = router;


