const router = require('express').Router();
const cartCntrl = require("../controllers/cart");


// Routes
router.get("/cart/add/:id", cartCntrl.cart_add_get);

module.exports = router