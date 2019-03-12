const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type:String, default:""},
  lastname: {type:String, default:""},
  password: {type:String, default:""},
  email: {type:String, default:""},
  hospitals:{type:Array, default:[]}
});


module.exports = mongoose.model('user', userSchema);
