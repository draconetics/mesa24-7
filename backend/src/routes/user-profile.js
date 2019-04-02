const mongoose = require('mongoose');
const User = require('../models/user.js');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const conn = mongoose.connection;
//conn.on('error', console.error.bind(console, 'connection error:')); 
//conn.on('connected', function(){console.log("success conetion to mongoDB")});


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




// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');//collection name is fs
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/restaurant',
  file: (req, file) => {
    console.log(req.session.iduser);
    return {
      filename: `${Date.now()}-${file.originalname}`,
      metadata: {'userId': req.headers['x-data-user'] },
    }
  }
});
const upload = multer({ storage }).single('file');

const idUser = null;
router.post('/upload',(req, res, next)=>{
    console.log("entering to upload method");
    console.log(req.headers['x-data-image']);
    console.log(req.headers['x-data-user']);
    req.session.iduser = req.headers['x-data-user'];
    console.log(req.session.iduser);
    next();
}, function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.status(500).json({info:'error', error:err});
    }
    next();
    // Everything went fine 
  })},async (req, res) => {
    console.log('this is the new file');
  console.log(req.file);
  console.log('this is the id ' + req.headers['x-data-image']);
    await gfs.remove({ _id: req.headers['x-data-image'] },
        function (err) {
            if (err) {
                console.log('error removing old image.')
                return handleError(err)
            }else{
                console.log('success deleting old image.');

                res.status(200).json({
                    info:'succesfull created', 
                    image: req.file,
                });        
            }
                
        });

/*
  await User.findOneAndUpdate(
        {'_id': req.headers['x-data-id']}, 
        {$set:{ 'imageId': 456 } },
        { //options
            returnNewDocument: true,
            new: true,
            strict: false
        },
       function(err, newDocument){  
          if(err)console.log(err);
          console.log(newDocument);
       });
  console.log('final operation');
*/

});


router.get('/files/:idimage', (req, res) => {
  console.log("getting image");
  
  let mid = mongoose.Types.ObjectId(req.params.idimage);
  console.log(mid);
  gfs.files.findOne({ _id: mid }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});


// @route GET /image/:filename
// @desc Display Image
router.get('/image/:idimage', (req, res) => {
  let mid = mongoose.Types.ObjectId(req.params.idimage);
  gfs.files.findOne({ _id: mid }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

router.get('/image/remove/:idimage', async(req, res) => {

    let idimage = req.params.idimage;
    console.log(idimage);
    await gfs.remove({ _id: idimage },
            function (err, data) {
                if (err) return res.status(500).json({info: 'error removing an image.'});
                console.log('verifing is there is an error');
                //console.log(data)
            });
    console.log('final operation');
    res.json({info:'success removing image '+idimage});
});


module.exports = router;