const express = require('express');
const router = express.Router();

router.get('/',isAuthenticated,(req,res)=>{
	res.json({info: "welcome to profile"});
});

router.get('/tmp',isAuthenticated,(req,res)=>{
	res.json({info: "welcome to tmp"});
});

function isAuthenticated(req, res, next) {
	console.log('isAuthenticated method');
	
	if(req.isAuthenticated()) {
		console.log('isAuthenticated');
		return next();
	}

	console.log("no authenticated - redirect");
	res.status(500).json({info:"Unauthorized...."});
}

module.exports = router;