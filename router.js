var express = require("express")
var http = require('http')
var parseXML = require('xml2js').parseString
var md5 = require('md5')
var url = require('url')

var router = express.Router();

router.get("/content",function(req, res) {
	http.get('http://ictg.cosc.canterbury.ac.nz:8001/?server=adapt2&request=scode', function(ictgResponse){
	  ictgResponse.on('data', function(data){
		console.log(data)
		parseXML(data, function (err, result) {
			let code = result['session-code'].code[0].trim()
			let codeid = result['session-code'].codeid[0].trim()
			let ictgSessionSecretWord = 'problemaidcatpgt'
			let user = req.query.user
			
			console.dir(code);
			console.dir(codeid);
			
			let hashCode = md5(user + code + ictgSessionSecretWord)
			
			console.log(hashCode)
			
			res.redirect('http://ictg.cosc.canterbury.ac.nz:8001/?' + url.parse(req.url).query + '&server=adapt2&request=problem&codeid=' + codeid + '&hcode=' + hashCode)
			
		});
		//res.json({"error" : false, "result" : data});
		//console.log(req.params.umParams + " reported");
	  });
	}).on("error", function(e){
	  res.json({"error" : true, "result" : e.message});
	  //console.log("UM Report ERROR " + e.message);
	});
	
	
	//let ictgSessionSecretWord = 'problemaidcatpgt'
})

/*TO CHECK IF API WORKS*/
router.get("/test",getTest);

function getTest(req, res) {
	res.json({"REST_API" : "RUNNING"});
}

module.exports = router;