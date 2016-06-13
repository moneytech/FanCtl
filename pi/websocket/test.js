#!/usr/bin/env node

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var conf = require('./config.json');

var FanCtl = require('./fans.js');

new FanCtl(1, 42);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/static/index.html');
});

io.sockets.on('connection', function(socket)
{
	socket.on('connect', function()
	{
		console.log(socket.client);
	});

	socket.emit('connect', {});
	// socket.emit('fanupdate', {"key":"value"});
});

server.listen(conf.port);