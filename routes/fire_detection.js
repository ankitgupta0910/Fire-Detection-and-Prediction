var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var parseString = require('xml2js').parseString;
var PythonShell = require('python-shell');

var chunk;

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req);
    console.log(req.query.var);

    var options = {
        args: [req.query.var]
    };

    PythonShell.run('/CMPE295B/Janish/object_detection.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });


    res.render('fire_detection', { result: 'detected_' + req.query.var + '.jpg'});
});





module.exports = router;


