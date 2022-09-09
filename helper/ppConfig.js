// Require Passport
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// Require User Model
const {User} = require("../models/User");

// Serialze User
// Save the data into the session
// Unique Identifier
passport.serializeUser(function(user, done){
    done(null, user.id)
});

// DeSerialze User
// Reading the information from the database according to the ID from Session.
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: "emailAddress",
    passwordField: "password"
},
    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

// Export Passport Middleware
module.exports = passport;







//exporting passport middleware
module.exports = passport