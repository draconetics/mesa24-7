const router = require('express').Router();
const passport = require('passport');

router.get('/',(req,res,next) => {
	res.json({login:'loggin insterface.'});
});

router.post('/',(req,res,next) => {
	console.log("post");
	//res.json({login:'loggin insterface.'});
	let {email, password} = req.body;
	console.log(email + " " + password);
	next();
	},
	passport.authenticate('local-signin'),
	(req,res)=>{
		console.log(req.user);
		res.json({id:req.user.id, name: req.user.name});
	}
);

router.post('/logout', (req, res) => {
	console.log('logout');
    if (req.user) {
        req.logout();
        res.send({ msg: 'logging out' });
    } else {
        res.send({ msg: 'no user to log out' });
    }
});

router.get('/profile',(req,res,next)=>{
		console.log('profile');
		console.log(req.user);
		next();
	},
	isAuthenticated,(req,res,next)=>{
		console.log('session in progress');
		res.json({user:req.user.name,id:req.user._id});
	});


router.post('/signup',
	(req,res,next)=>{
	
	 passport.authenticate('local-signup', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { 
		        return res.status(401).json({message:info, error: "Error creating new user"});
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

  res.redirect('/api/login');
}


module.exports = router;