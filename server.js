var express = require("express");
var bodyParser  = require("body-parser");
var router = require("./router");

var app  = express();

function SQLTUTOR(){
    var self = this;
    self.configureExpress();;
};

SQLTUTOR.prototype.configureExpress = function() {
	var self = this;
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use('/sqltutor', router);
	self.startServer();
}

SQLTUTOR.prototype.startServer = function() {
	app.listen(4001,function(){
	  console.log("All right ! I am alive at Port 4001.");
	});
}

new SQLTUTOR();