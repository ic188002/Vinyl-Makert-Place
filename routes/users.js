const express= require('express');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({ extended: true }));

const userCntrl = require("../controllers/users");

// IsLoggedIn middleware
const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
// router.get("/users/add", IsLoggedIn, userCntrl.user_create_get);
// router.post("/users/add", userCntrl.user_create_post);
// router.get("/users/myaccount", IsLoggedIn, userCntrl.user_index_get);
router.get("/users/myaccount", IsLoggedIn, userCntrl.user_show_get);
// router.get("/users/delete", userCntrl.user_delete_get);
// router.get("/users/edit", userCntrl.user_edit_get);
// router.put("/users/update", userCntrl.user_update_put);




module.exports = router;