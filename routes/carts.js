const express= require('express');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({ extended: true }));

const cartCntrl = require("../controllers/carts");

// Routes
router.get("/carts/add/:id", cartCntrl.cart_add_get);
router.get("/carts/index", cartCntrl.cart_show_get);
router.get("/carts/edit", cartCntrl.cart_edit_get);
router.put("/carts/update", cartCntrl.cart_update_put);

module.exports = router