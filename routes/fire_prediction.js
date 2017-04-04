var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"
var PythonShell = require('python-shell');
var chunk;

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req);
    console.log(req.query.var);

    // var options = {
    //     host: 'cdfdata.fire.ca.gov',
    //     path: '/incidents/rss.xml'
    // };
    //
    // http.get(options, function(res) {
    //     console.log("Got response: " + res.data);
    //     res.on('data', function (chunk) {
    //         console.log('BODY: ' + chunk);
    //     });
    //     }).on('error', function(e) {
    //     console.log("Got error: " + e.message);
    // });
    // while(chunk != "undefined")
    //     var cleanedString = chunk.replace("\ufeff", "");
    //     console.log(cleanedString);

    res.render('fire_prediction', { title: 'Express' });
});


// PythonShell.run('/CMPE295B/Janish/object_detection.py', function (err) {
//     if (err) throw err;
//     console.log('finished');
// });


module.exports = router;


