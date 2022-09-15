const router = require('express').Router();
const cartCntrl = require("../controllers/carts");


// Routes
router.get("/carts/add/:id", cartCntrl.cart_add_get);
router.get("/carts/index", cartCntrl.cart_show_get);

module.exports = router