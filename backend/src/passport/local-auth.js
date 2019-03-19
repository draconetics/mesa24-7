const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//setting cookie on user's browser.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  console.log('localstrategy')
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    return done(null, false, {error: "ptm"});
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',//email
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  console.log('local-signin');
  const user = await User.findOne({email: email});
  if(!user) {
    console.log('email dont exist');
    return done(null, false);
  }

  return done(null, user);
}));


module.exports = passport;