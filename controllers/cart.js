const {Record} = require("../models/Record");
const {User} = require("../models/User");
const {Cart} = require("../models/Cart");
const moment = require('moment');

exports.cart_add_get = (req, res) => {
    let recordId = req.params.id
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Record.findById(recordId)
    .then((record) => {
        // IF CART DOESN'T ALREADY CONTAIN RECORD THEN----
        cart.record.push(record)
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/records/index");
        // ----

        // IF USER IS LOGGED IN THEN----
        cart.save()
        // ----

        // req.session.destroy();
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}