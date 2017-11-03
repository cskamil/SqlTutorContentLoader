var nconf = require('nconf');
nconf.file({
  file: './config.json'
});

module.exports = function(param) {
	return nconf.get(param)
}