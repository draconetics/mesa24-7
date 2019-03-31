const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const session = require('express-session');
const session = require('cookie-session') 
const passport = require('passport');
//const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise





app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


const uri = "mongodb://localhost:27017/restaurant"; 
mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
mongoose.set({useNewUrlParser: true});
const conn = mongoose.connection;
//conn.on('error', console.error.bind(console, 'connection error:')); 
//conn.on('connected', function(){console.log("success conetion to mongoDB")});

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');//collection name is fs
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return {
      filename: file.originalname
    }
  }
});
const upload = multer({ storage });


require('./passport/local-auth');

/*
app.use(session({
  name:'restaurant_app',
  secret: 'mysecretsession',
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}));
*/

app.use(session({  
    name: 'passport-session',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());


//CORS middleware
app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie");
    next();
});

// routes
app.use('/api/', require('./routes/user-logging'));
app.use('/api/user', require('./routes/user-route'));
app.use('/api/user/profile', require('./routes/user-profile'));



app.post('/api/user/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  console.log("uploading")
  console.log("id_user : ",req.body.id);
  console.log("name : ",req.body.name);
  console.log(req.file.id);
  res.status(200).json({info:'ok',idImage:req.file.id});
});


app.get('/files/:idimage', (req, res) => {
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
app.get('/image/:idimage', (req, res) => {
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


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(app.get('port'),function(req,res){
	console.log('Welcome listening on the port ' + app.get('port'))
});