var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var parseString = require('xml2js').parseString;
var PythonShell = require('python-shell');
var dateFormat = require('dateformat');
var chunk;

/* GET home page. */
router.get('/', function(req, res, next) {

    // console.log(req);
    console.log(req.query.var);
    console.log(req.query.var1);
    console.log("Ankit" + req.query.var2);
    var now = req.query.var2;
    console.log(dateFormat(now, "yyyymmdd"));
    var options = {
        args: [req.query.var]
    };

    PythonShell.run('/CMPE295B/Janish/object_detection.py', options, function (err, results) {
        if (err) throw err;
        console.log('results: %j', results);
    });


    res.render('fire_detection', { result: 'detected_' + req.query.var + '_0.jpg', detail: req.query.var1, qdate: dateFormat(now, "yyyymmdd")});
});





module.exports = router;


