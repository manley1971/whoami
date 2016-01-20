'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.get('/', function(req, res) {
  let retval = {};
  retval["ipaddress"]=req.headers["x-forwarded-for"];
  retval["software"]=req.headers["user-agent"];
  retval["language"]=req.headers["accept-language"].split(",")[0];
  res.end(JSON.stringify(retval));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
