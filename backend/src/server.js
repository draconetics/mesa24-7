const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

app.set('port', process.env.PORT || 3050);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())



require('./database');
require('./passport/local-auth');

app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//CORS middleware
app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// routes
app.use('/api/login', require('./routes/user-logging'));
app.use('/api', require('./routes/user-route'));
app.use('/api/user', require('./routes/user-profile'));


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(app.get('port'),function(req,res){
	console.log('Welcome listening on the port ' + app.get('port'))
});