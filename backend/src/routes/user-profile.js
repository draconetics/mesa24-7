const express = require('express');
const router = express.Router();

router.get('/profile',(req,res)=>{
	res.json({msg: "welcome to profile"});
});

router.get('/tmp',(req,res)=>{
	res.json({msg: "welcome to tmp"});
});



module.exports = router;