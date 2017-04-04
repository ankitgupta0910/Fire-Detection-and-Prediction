var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var http = require('http');
var rss = require('rss-api');
var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"

var chunk;

/* GET home page. */
router.get('/fire_fighters', function(req, res, next) {


    res.render('index', { title: 'Express' });
});

module.exports = router;


