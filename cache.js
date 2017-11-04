var storage = require('node-persist')

try {
	storage.initSync( {
		dir: 'session_cache',
		stringify: JSON.stringify,
		parse: JSON.parse,
		encoding: 'utf8',
		logging: false,  // can also be custom logging function 
		continuous: true, // continously persist to disk 
		interval: false, // milliseconds, persist to disk on an interval 
		ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS 
		expiredInterval: 24 * 60 * 60 * 1000, //every day the process will clean-up the expired cache 
		forgiveParseErrors: false
	});
} catch(error) {
	console.log(error)
}

module.exports = storage