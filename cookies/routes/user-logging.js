const router = require('express').Router();

router.get('/',(req,res,next) => {
	console.log("/login", req.sessionID);
	//console.log(req);
	//console.log(req.coockie);
	//console.log(req.session);
	if(req.session.views != null)
  		req.session.views = req.session.views + 1;
  	else
  		req.session.views = 0;
  	//res.cookie('views', req.session.views, {secure: true, httpOnly: true, maxAge: 1209600000})
	console.log(req.session);
	res.json({login:'loggin insterface.', views:req.session.views});

});

router.post('/',(req,res,next) => {
	console.log("/login (post)");
	//res.json({login:'loggin insterface.'});
	let {email, password} = req.body;
	console.log(email + " " + password);
	

	
});


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
	(req,res)=>{
		console.log('session in progress*********************');
		res.status(200).json({info:'ok',data:"profile data"});
	});

router.get('/tmp',(req,res)=>{
		console.log('tmp website');
		res.json({info:'ok',data:"tmp data"});
		//console.log(req.user);
		//next();
	});

router.post('/signup',
	(req,res,next)=>{
	
}); 




module.exports = router;