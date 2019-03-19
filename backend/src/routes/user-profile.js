const express = require('express');
const router = express.Router();

router.get('/profile',(req,res)=>{
	res.json({msg: "welcome to profile"});
});

module.exports = router;