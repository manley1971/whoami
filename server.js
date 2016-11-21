'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
require('dotenv').load();

app.use('/public', express.static(process.cwd() + '/public'));


//just put everything at root as per example
app.get('/', function(req, res) {
  let retval = {};
  retval["ipaddress"]=req.headers["x-forwarded-for"];
  retval["software"]=req.headers["user-agent"];

  retval["language"]=req.headers["accept-language"].split(",")[0];
  retval["guess"]="Dave Manley maybe";
  res.end(JSON.stringify(retval));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
