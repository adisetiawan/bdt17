const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const session = require('express-session');

//import router
const routerAPI = require('./router/api');
const routerAccounts = require('./router/accounts')

app.locals.webtitle = "My Website";

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

//views middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//passport initilization
app.use(express.static('public'));
//app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(session({ 
	secret: 'keyboard cat', 
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());


//passport fb middleware
passport.use(new FacebookStrategy({
    clientID: 1726410697373667,
    clientSecret: '63e8074e48cbce8f8a6a0cbcfcc60097',
    callbackURL: "http://localhost:3003/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null,profile);
  }
));

//serialize/deserialize session
passport.serializeUser(function(user, done) {
  //var sess = req.session
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//fb callback
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/accounts',
                                      failureRedirect: '/login' }));

//homepage
app.get('/', function(req, res) {
	res.render('home');
});

//protected route
app.use('/api', routerAPI);
app.use('/accounts', routerAccounts);

//logout route
app.get('/logout', function(req, res) {
	req.session.destroy();
	req.app.locals.isLogged = false;
	req.logout();
	res.redirect('/accounts');
});



app.listen(3003);