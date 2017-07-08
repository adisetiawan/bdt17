const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const router = express.Router();

const blogsDB = new Datastore({ filename: './blogs-data', autoload: true });

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//check if user is logged in
function isUserLogged(req, res, next) {
	// if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        //req.session.isLogged = true;
        req.app.locals.isLogged = true;
        return next();
    } else {
    	//req.session.isLogged = false;
    	req.app.locals.isLogged = false;
    	// if they aren't redirect them to the home page
    	res.redirect('/');
    }
    
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

//user dashboard
router.get('/', isUserLogged, function(req, res) {
	//console.log(req.session);
	res.render('accounts/dashboard', {name: req.user.displayName});
});

//blogs list
router.get('/blogs', isUserLogged, function(req, res) {
	//find blog post
	blogsDB.find({ }, function (err, docs) {
		if(err) {
  			console.error(err.stack);
  			res.status(500).send('Something broke!');
  		}
  		res.render('accounts/blogs', {blogs : docs});
	});

	
});

//add new blog
router.get('/blogs/add', isUserLogged, function(req, res) {
	
	res.render('accounts/blogs-add');
});
router.post('/blogs/add', isUserLogged, function(req, res) {
	//res.json(req.body);
	let newDoc = {
		title : req.body.title,
		content : req.body.content
	}
	blogsDB.insert(newDoc, function (err, newDoc) { 
  		if(err) {
  			console.error(err.stack);
  			res.status(500).send('Something broke!');
  		}
  		res.redirect('/accounts');
	});
});

//update blog
router.get('/blogs/edit/:id', isUserLogged, function(req, res) {
	blogsDB.findOne({ _id: req.params.id }, function (err, doc) {
		if(err) {
  			console.error(err.stack);
  			res.status(500).send('Something broke!');
  		}
  		if(doc == null) {
  			res.end('record not found');
  		}
  		res.render('accounts/blogs-edit', {blog : doc});
	});


});
router.post('/blogs/edit', isUserLogged, function(req, res) {
	//res.json(req.body);
	let updateDoc = {
		title : req.body.title,
		content : req.body.content
	}
	blogsDB.update({ _id: req.body.id}, {$set: updateDoc}, function (err, numReplaced) { 
  		if(err) {
  			console.error(err.stack);
  			res.status(500).send('Something broke!');
  		}
  		res.redirect('/accounts/blogs');
	});
});
router.get('/blogs/del/:id', isUserLogged, function(req, res) {
	//res.json(req.body);
	
	blogsDB.remove({ _id: req.params.id}, {}, function (err, numRemoved) { 
  		if(err) {
  			console.error(err.stack);
  			res.status(500).send('Something broke!');
  		}
  		res.redirect('/accounts/blogs');
	});
});


module.exports = router;