// Require User Model
const User = require("../models/User");

// Require Passport Configurations
let passport = require("../helper/ppConfig");

// Require bcrypt for hashing
const bcrypt = require('bcrypt');
const salt = 10;

// APIs for User Registration and Authentication

// HTTP GET - Signup Route - To load the signup form
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

// HTTP POST - Signup Route - To post the data into the database for registration
exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);

    console.log(req.body.password);
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    user.password = hash;

    user.save()
    .then(()=> {
        res.redirect("/");
    })
    .catch((err)=> {
        console.log(err);
        res.send("Please try again later.")
    })
}

// HTTP GET - Signin Route - To load the signin form
exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}

// HTTP POST - Signin Route - To post the data for authentication
exports.auth_signin_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/auth/signin"
})

// HTTP GET - Logout Route - To logout the user
exports.auth_logout_get = (req, res) => {
    // Invalidates the session
   req.logout(function(err) {
    if(err) { 
        
        return next(err);}
    req.flash("success", "You are logged out successfully!!!")
    res.redirect("/auth/signin");
   }) 
}