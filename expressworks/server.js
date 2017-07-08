//1
// const express = require('express');
// const app = express();

// app.get('/home', function(req, res) {
// 	res.end('Hello World!');
// });

// app.listen(process.argv[2]);

//2
// const path = require('path');
// const express = require('express');
// const app = express();

// app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

// app.listen(process.argv[2]);

//3
// const path = require('path');
// const express = require('express');
// const app = express();

// app.set('views', path.join(__dirname, 'templates'));
// app.set('view engine', 'pug');

// app.get('/home', function(req, res) {
// 	res.render('index', {date: new Date().toDateString()});
// });

// app.listen(process.argv[2]);

//4
// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser')
// const app = express();

// app.use(bodyParser.urlencoded({extended: false}));

// app.get('/form', function(req, res) {
	
// 	res.send('<form method="post" action="/form"><input name="str"/></form>');
// });
// app.post('/form', function(req,res) {
// 	res.end(req.body.str.split('').reverse().join(''));
// });

// app.listen(process.argv[2]);


//5
// const path = require('path');
// const express = require('express');

// const app = express();

// app.use(require('stylus').middleware(process.argv[3] || path.join(__dirname, 'public')));

// app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

// app.listen(process.argv[2]);

//6
// const path = require('path');
// const express = require('express');

// const app = express();

// app.put('/message/:id', function(req, res) {
// 	res.send(require('crypto')
//       .createHash('sha1')
//       .update(new Date().toDateString() + req.params.id)
//       .digest('hex'));
// });

// app.listen(process.argv[2]);

//7
// const path = require('path');
// const express = require('express');

// const app = express();

// app.get('/search', function(req, res) {
// 	res.send(req.query);
// });

// app.listen(process.argv[2]);

//8
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/books', function(req, res) {
	
	fs.readFile(process.argv[3], function(err, data) {
		if(err) {
			console.log(err);
		}
		res.json(JSON.parse(data.toString()));
	});
	
});

app.listen(process.argv[2]);

