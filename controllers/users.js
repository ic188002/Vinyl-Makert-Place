// Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/User");
const {Payment} = require("../models/Payment");

//possibles








// Require Moment Library
const moment = require('moment');

// CRUD

// CREATE
// HTTP GET - Load User From
exports.user_create_get = (req, res) => {
    res.render("user/add");
}

// HTTP POST - User
exports.user_create_post = (req, res) => {
    // Saving the data into the Database
    let user = new User(req.body);

    user.save()
    .then(() => {
        res.redirect("/user/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}

// HTTP GET - User Index API
exports.user_index_get = (req, res) => {
    User.find()
    .then(users => {
        res.render("user/index", {users: users, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - User By Id
exports.user_show_get = (req, res) => {
    console.log(req.query.id);

    // Find the user by ID
    User.findById(req.query.id).populate('article')
    .then(user => {
        res.render("user/detail", {user, moment})
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE
// HTTP GET - Load User Edit Form
exports.user_edit_get = (req, res) => {
    User.findById(req.query.id)
    .then((user) => {
        res.render("user/edit", {user})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - User Update
exports.user_update_put = (req, res) => {
    console.log(req.body.id);

    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/user/index");
    })
    .catch(err => {
        console.log(err)
    })
}

// DELETE
// HTTP DELETE - User
exports.user_delete_get = (req, res) => {
    console.log(req.query.id);

    User.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/user/index");
    })
    .catch(err => {
        console.log(err);
    })
}