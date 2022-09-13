// Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/user");
const {Payment} = require("../models/Payment");

//possibles








// Require Moment Library
const moment = require('moment');

// CRUD

// CREATE
// LOOK TO ../controllers/auth.js

// HTTP GET - User Index API
// exports.user_index_get = (req, res) => {
//     User.find()
//     .populate('record')
//     .then(users => {
//         res.render("users/myaccount", {users: users, moment})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // HTTP GET - User By Id
exports.user_show_get = (req, res) => {
    console.log(req.user._id);
    // Find the record by ID
    User.findById(req.user._id).populate('record')
    .then(user => {
        res.render("users/myaccount", {user, moment})
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

//post

exports.user_picture_post = ('/', upload.single('image'), (req, res, next) => {

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