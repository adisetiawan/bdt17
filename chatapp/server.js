const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const session = require('express-session');
var http = require('http').Server(app);
const io = require('socket.io')(http);

//db
const datastore = require('nedb');
const blogs = new datastore({filename: './db-blogs', autoload: true});

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
//configure session

let sessionMid = session({ 
	secret: 'keyboard cat', 
	resave: false, 
	saveUninitialized: false, 
	cookie: { secure: false }
});
io.use(function(socket, next) {
	sessionMid(socket.request, socket.request.res, next);
});
app.use(sessionMid);


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	done(null,user);
});
passport.deserializeUser(function(user, done) {
	done(null,user);
});
passport.use(new FacebookStrategy({
	clientID: '1726410697373667',
	clientSecret: '63e8074e48cbce8f8a6a0cbcfcc60097',
	callbackURL: 'http://localhost:3003/auth/facebook/callback'
},function(accessToken, refreshToken, profile, cb) {
	//console.log(profile);
	return cb(null,profile);
}));

function checkAuthenticate(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.send('<a href="/auth/facebook">login</a>');
	}
}

//root
app.get('/', checkAuthenticate, function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

//facebook auth root
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {
		// successRedirect : '/',
		failureRedirect : '/login'
	}), 
	function(req, res) {
		res.redirect('/');
});


app.get('/logout', function (req, res){
	req.session.destroy(function(err) {
		req.logout();
  		res.redirect('/');
	})
  
});

//socket io connection
io.on('connection', function(socket) {
	
	socket.on('chat message', function(msg) {
		let sess = socket.request.session.passport;
		let newMsg = sess.user.displayName + ': ' + msg;

		//console.log(socket.request.session);
		//console.log('message: ' + newMsg);

		if(msg == '/blogs') {
			blogs.find({}, function(err, docs) {
				io.emit('chat message', JSON.stringify(docs));
			});
		} else {
			io.emit('chat message', newMsg);
		}

	})
});


http.listen(3003, function() {
	console.log('listening on port 3001');
})