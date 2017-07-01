var fs = require('fs');
var path = require('path');

module.exports = function(dirname, extname, callback) {
	fs.readdir(dirname, function(err, data) {
		if(err) {
			return callback(err, null);
		}
		var filteredLs = [];
		data.forEach(function(file) {
			if('.' + extname == path.extname(file)) {
				filteredLs.push(file);
			}
		});
		return callback(null,filteredLs);
	})
}