//1
//console.log('HELLO WORLD');

//2
// var sum = 0;
// for(var i =2; i < process.argv.length; i++) {
// 	sum += parseInt(process.argv[i]);
// }
// console.log(sum);

//3
// var fs = require('fs');

// var buff = fs.readFileSync(process.argv[2]);
// console.log(buff.toString().split('\n').length - 1);

//4
// var fs = require('fs');
// fs.readFile(process.argv[2], function(err,data) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	console.log(data.toString().split('\n').length - 1);
// });

//5
// const fs = require('fs');
// const path = require('path');

// fs.readdir(process.argv[2], function(err, list) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	list.forEach(function(file) {
// 		if('.' + process.argv[3] == path.extname(file)) {
// 			console.log(file);
// 		}
		
// 	});
	
// });

//6
// var getFiles = require('./module.js');
// getFiles(process.argv[2], process.argv[3], function(err, data) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	data.forEach(function(file) {
// 		console.log(file);
// 	});
// });

//7
// const http = require('http');

// http.get(process.argv[2], function(response) {
// 	//var content = [];

// 	response.on('data', function(data) {
// 		console.log(data.toString());
// 	});
// 	// response.on('end', function() {
// 	// 	//console.log(content);
// 	// });

// });

//8
// const http = require('http');
// http.get(process.argv[2], function(response) {
// 	var raw = '';

// 	response.setEncoding('utf8');

// 	response.on('error', function(err) {
// 		return console.log(err);
// 	});

// 	response.on('data', function(data) {
// 		raw += data;
// 	});

// 	response.on('end', function() {
// 		console.log(raw.length);
// 		console.log(raw);
// 	})
// });


//9
// const http = require('http');
// http.get(process.argv[2], function(response) {
// 	var raw1 = '';
// 	response.setEncoding('utf8');
// 	response.on('error', function(err) {
// 		return console.log(err);
// 	});
// 	response.on('data', function(data) {
// 		raw1 += data;
// 	});
// 	response.on('end', function() {
// 		console.log(raw1);
// 		var raw2 = '';
// 		http.get(process.argv[3], function(response) {
// 			response.setEncoding('utf8');
// 			response.on('data', function(data) {
// 				raw2 += data;
// 			});
// 			response.on('end', function() {
// 				console.log(raw2);
// 				var raw3 = '';
// 				http.get(process.argv[4], function(response) {
// 					response.setEncoding('utf8');
// 					response.on('data', function(data) {
// 						raw3 += data;
// 					});
// 					response.on('end', function() {
// 						console.log(raw3);						
// 					});
// 				});
// 			});
// 		});
// 	});
// });


//10
const net = require('net');

net.createServer(function(socket) {
	var myDate = new Date();
	var month = myDate.getMonth();
	if(month < 10) {
		month = '0' + (month+1);
	}
	var date = myDate.getDate();
	if(date < 10) {
		date = '0' + date;
	}

	socket.write(myDate.getFullYear() + '-' + month + '-' + date + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + "\n");
	socket.end();
})
.listen(process.argv[2]);
