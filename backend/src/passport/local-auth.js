const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//setting cookie on user's browser.
passport.serializeUser((user, done) => {
 // if(user)
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
    const emailExists = await User.findOne({'email': email});
    //console.log(user);
     //console.log(req.body);
    if(emailExists) {
        let message = 'Email already registered, insert another email'
        return done(null, false, {info: message, user:false});
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        //newUser.password = password;
        newUser.name = req.body.name;
        newUser.lastname = req.body.lastname;
        //console.log(req.body);
        await newUser.save(function(err, userSaved){
            if(err) res.status(200).json({
                info: "Error saving new user.",
                user: userSaved
            });
        });
        
        done(null, newUser, {info: 'User saved correctly', user:newUser});
        //done(null,false);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',//email
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    console.log('local-signin');

    if(email == null)
        return done(null, false, {info:"email is null"});
    if(password == null)
        return done(null, false, {info:"password is null"});

    const user = await User.findOne({email: email});
    //console.log(user);
    if(user == null) {
        console.log('email dont exist');
        return done(null, false, {info: "user doesnt exist!",user:false});
    }

    user.comparePassword(password, function(err, match) {
        // Here, `err == null` and `match == false`
        if (err) return callback(err);
        if (!match) {
            console.log('password incorrect');
            return done(null, false, {info:"password incorrect",user:false});
        }
        // Update the user
        //user.lastSignedIn = Date.now();
        });

    //console.log("database ----------------------------");
    //console.log(user);

    //error on sighin then user is false.
    return done(null, user);
}));


module.exports = passport;