var express = require("express")
var http = require('http')
var parseXML = require('xml2js').parseString
var md5 = require('md5')
var url = require('url')
var config = require('./configger')

var router = express.Router();

router.get("/content",function(req, res) {
	let content_url = config('host') + "?" + config('session_params')
	
	http.get(content_url, function(contentResponse){
	  contentResponse.on('data', function(data){
		parseXML(data, function (err, result) {
			try {
				let code = result['session-code'].code[0].trim()
				let codeid = result['session-code'].codeid[0].trim()
				
				let user = req.query.user			
				let hashCode = md5(user + code + config('secret_word'))
				
				res.redirect(config('host') + "?" + config('problem_params') + '&codeid=' + codeid + '&hcode=' + hashCode + '&' + url.parse(req.url).query)
			} catch(error) {
				res.json(config('error_message') + error)
			}			
		});
	  });
	}).on("error", function(e){
	  res.json(config('error_message') + e.message)
	});
})

/*TO CHECK IF API WORKS*/
router.get("/test",getTest);

function getTest(req, res) {
	res.json({"REST_API" : "RUNNING"});
}

module.exports = router;