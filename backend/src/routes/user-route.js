const router = require('express').Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
  	//res.json("welcome with json");
  	User.find({}, function(err, users) {
  		if(err)
			res.status(500).json({
				error: "Error getting the data.",
				details: err
			});
		res.status(200).json(users);
  	});
});



router.post('/',(req,res) => {
	let newUser = req.body;
	let userModel = new User();
	
	userModel.name = newUser.name;
	userModel.lastname = newUser.lastname;
	userModel.email = newUser.email;
	userModel.password = newUser.password;

	console.log(userModel);

	userModel.save(function(err, newUser){
		if(err)
			res.status(500).json({
				error: "Error saving data.",
				details: err
			});
		res.status(200).json({
			response: "User successfully saved.",
			user: newUser
		});
	});
});


router.put('/:id',(req,res) => {
	let idUser = req.params.id;
	let editedUser = req.body;

	editedUser = {...editedUser,hospitals:[]};

	User.findOneAndUpdate({_id: idUser}, editedUser, {new: true}, function(err, user) {
		if (err)
		  res.status(500).json({
		  	message: "error updating the file",
		  	details: err
		  });
		res.status(200).json({
		  	message: "User successfully updated",
		  	user
		  });
		});
});

router.delete('/:id',(req,res) => {
	let idUser = req.params.id;

	User.remove({_id: idUser},  function(err, user) {
		if (err)
		  res.status(500).json({
		  	message: "error deleting the document",
		  	details: err
		  });
		res.status(200).json({
		  	message: "User successfully deleted",
		  	user
		  });
		});
});




module.exports = router;
