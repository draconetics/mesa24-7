const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  name: {type:String, default:""},
  lastname: {type:String, default:""},
  password: {type:String, default:""},
  email: {type:String, default:""},
  hospitals:{type:Array, default:[]}
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));//returned encripted password.
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);//return true or false
};

module.exports = mongoose.model('user', userSchema);
