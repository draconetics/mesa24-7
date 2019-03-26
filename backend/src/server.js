const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const session = require('express-session');
const session = require('cookie-session') 
const passport = require('passport');
//const MongoStore = require('connect-mongo')(session);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())



const dbConnection = require('./database') 
require('./passport/local-auth');

/*
app.use(session({
  name:'restaurant_app',
  secret: 'mysecretsession',
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}));
*/

app.use(session({  
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());


//CORS middleware
app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie");
    next();
});

// routes
app.use('/api/login', require('./routes/user-logging'));
app.use('/api/user', require('./routes/user-route'));
app.use('/api/user/profile', require('./routes/user-profile'));


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(app.get('port'),function(req,res){
	console.log('Welcome listening on the port ' + app.get('port'))
});