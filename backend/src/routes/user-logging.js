const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const User = require('../models/user.js');

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, 'this is a secret phrase', {
    expiresIn: ONE_WEEK
  });
}

router.get('/',(req,res,next) => {
	console.log("/login");
	res.json({login:'loggin insterface.'});
});

router.post('/',(req,res,next) => {
	console.log("/login (post)");
	//res.json({login:'loggin insterface.'});
	let {email, password} = req.body;
	console.log(email + " " + password);
	
	User.find({email:email})
		.exec()
		.then(user => {
			if(user.length < 1){
				return res.status(401).json({
					user:false,
					info:"email does not exist"
				});
			}
			//console.log((typeof user[0].password) + ' ' + (typeof password));
			if(user[0].password != password)
				return res.status(401).json({
					info:'Password is wrong',
					user: false
				});
			const userJson = user[0].toJSON();
			return res.json({info:'ok', user:user[0], token:jwtSignUser(userJson)});
		});
	
});

/*
router.post('/',(req,res,next) => {
		console.log("/login (post)");
		//res.json({login:'loggin insterface.'});
		let {email, password} = req.body;
		console.log(email + " " + password);
		passport.authenticate('local-signin', function(err, user, info){
			//console.log(info);
			//console.log(user);
			if(!user){
				console.log('user is undefined');
				res.status(200).json(info);	
			}
			req.logIn(user, function(err) {
		      if (err) { return next(err); }
		      	//console.log(req);
		      	const userJson = user.toJSON()
		      	return res.json({info:'ok', user:req.user, token:jwtSignUser(userJson)});
		    });
		})(req, res, next);

		}
);
*/
/*
router.post('/',passport.authenticate('local-signin'),(req,res)=>{

		console.log("you are logged");
		console.log(req.user);
		res.json({id:req.user.id});
});
*/
router.post('/logout', (req, res) => {
	console.log('logout');
    if (req.user) {
        req.logout();
        res.send({ msg: 'logging out' });
    } else {
        res.send({ msg: 'no user to log out' });
    }
});

router.get('/profile',
	ensureToken,(req,res)=>{
		console.log('session in progress*********************');
		res.status(200).json({info:'ok',data:"profile data"});
	});

router.get('/tmp',ensureToken,(req,res)=>{
		console.log('tmp website');
		res.json({info:'ok',data:"tmp data"});
		//console.log(req.user);
		//next();
	});

router.post('/signup',
	(req,res,next)=>{
	
	 passport.authenticate('local-signup', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { 
		        res.status(401).json({message:info, error: "Error creating new user"});
		        return;
		    }
	    createSendToken(req.user, res);
	  })(req, res, next);
}); 


function isAuthenticated(req, res, next) {
	console.log('isAuthenticated method');
	
  if(req.isAuthenticated()) {
  	console.log('isAuthenticated');
    return next();
  }
  console.log("no authenticated - redirect");
  res.redirect('/api/login');
}

function ensureToken(req, res, next) {
	console.log('ensureToken');
	//console.log(req.headers);
	const bearerHeader = req.headers['authorization'] || req.headers.authorization;
	//const bearerHeader = req.headers['cache-control'];
	console.log('bearerHeader');
	console.log(bearerHeader);
	if(typeof bearerHeader !== 'undefined'){

		const bearer = bearerHeader.split(' ');//split if exist space.
		const bearerToken = bearer[1];
		console.log('new token .... ');
		console.log(bearerToken);
		//req.token = bearerToken;
		jwt.verify(bearerToken, 'this is a secret phrase', (err, data) => {
			if(err){ 
				res.status(403).json({info:'Incorrect Token'});
			}else
				next();
		});
		
	}else{
		res.status(403).json({info:'access denied'});
	}
}


module.exports = router;