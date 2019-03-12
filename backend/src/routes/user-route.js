const router = require('express').Router();


router.get('/', (req, res) => {
  res.json("welcome with json");
});

router.post('/',(req,res) => {
	console.log('post');
	res.json({message:"post-response"});
});


module.exports = router;
