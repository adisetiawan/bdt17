var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/upload.html');
});

app.post('/upload', upload.single('gallery'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});


app.listen(5000);