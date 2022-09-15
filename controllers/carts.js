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
                if (element.toString() == record._id.toString()) {
                    abort = true;
                }
            });
            if (abort === true) {
                console.log("abort");
                res.redirect("/records/index");
            } else {
                cart.record.push(record)
                req.session.cart = cart;
                console.log(req.session.cart);
                res.redirect("/records/index")
            }
        } else {
            cart.record.push(record)
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect("/records/index")
        }
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}

exports.cart_show_get = (req, res) => {
    console.log(req.session.cart)
    let cart = new Cart(req.session.cart ? req.session.cart : {})
    Record.find()
    .then(cart => {
        res.render("carts/index")
    })
    .catch(err => {
        console.log(err)
    })
}