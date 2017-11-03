var express = require("express")
var http = require('http')
var parseXML = require('xml2js').parseString
var md5 = require('md5')
var url = require('url')
var config = require('./configger')
var cache = require('./cache')

var router = express.Router();

router.get("/content",function(req, res) {
	let user = req.query.user

	cache.get(user).then(function(cached_session) {
		if(cached_session) {
			res.redirect(getRedirectContentURL(cached_session.codeid, cached_session.hashCode, req))
		} else {
			requestSession(req, res, user)
		}
		
	}).catch(console.log);	
})

function requestSession(request, response, user) {
	let content_url = config('host') + "?" + config('session_params')
	
	http.get(content_url, function(contentResponse){
	  contentResponse.on('data', function(data){
		parseXML(data, function (err, result) {
			try {
				let code = result['session-code'].code[0].trim()
				let codeid = result['session-code'].codeid[0].trim()
								
				let hashCode = md5(user + code + config('secret_word'))
				
				cache.setItem(user, {"codeid": codeid, "hashCode":hashCode})
				
				response.redirect(getRedirectContentURL(codeid, hashCode, request))
			} catch(error) {
				response.json(config('error_message') + error)
			}			
		});
	  });
	}).on("error", function(e){
	  response.json(config('error_message') + e.message)
	});
}

function getRedirectContentURL(codeid, hashCode, request) {
	return config('host') + "?" + config('problem_params') + '&codeid=' + codeid + '&hcode=' + hashCode + '&' + url.parse(request.url).query
}

/*TO CHECK IF API WORKS*/
router.get("/test",getTest);

function getTest(req, res) {
	res.json({"REST_API" : "RUNNING"});
}

module.exports = router;