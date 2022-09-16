const {Record} = require("../models/Record");
const {User} = require("../models/User");
const {Cart} = require("../models/Cart");
const moment = require('moment');

exports.cart_add_get = (req, res) => {
    let recordId = req.params.id
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Record.findById(recordId)
    .then((record) => {
        if (req.session.cart !== undefined && req.session.cart.record.length > 0) {
            let abort;
            req.session.cart.record.forEach(element => {
                console.log();
                if (element._id.toString() == record._id.toString()) {
                    abort = true;
                }
            });
            if (abort === true) {
                console.log("abort");
                res.redirect("/records/index");
            } else {
                cart.record.push(record)
                req.session.cart = cart;
                res.redirect("/records/index")
            }
        } else {
            cart.record.push(record)
            req.session.cart = cart;
            res.redirect("/records/index")
        }
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}

exports.cart_show_get = (req, res) => {
    console.log(req.session.cart);
    try{// req.session.cart.record.pop();
        if (req.session.cart !== undefined && req.session.cart.record.length > 0) {
            res.render("carts/index")
        } else {
            res.redirect("/records/index")
        }}catch (err) {
        console.log(err);
        res.send("Please try again later!!!");
    }
}

// HTTP GET - Load Record Edit Form
exports.cart_edit_get = (req, res) => {
    console.log(req.session.cart);
    try{
        if (req.session.cart !== undefined && req.session.cart.record.length > 0) {
            res.render("carts/index")
        } else {
            res.redirect("/records/index")
        }}catch (err) {
        console.log(err);
        res.send("Please try again later!!!");
    }
}

// HTTP PUT - Record Update
exports.cart_update_put = (req, res) => {
    try{
        (req.session.cart.record).splice(req.query.pos, 1);
        res.redirect("/carts/edit")
    } catch (err) {
        console.log(err);
        res.send("Please try again later!!!");
    }
}