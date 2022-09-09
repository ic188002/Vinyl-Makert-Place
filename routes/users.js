const express= require('express');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({ extended: true }));

const userCntrl = require("../controllers/user");

// IsLoggedIn middleware
const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get("/user/add", IsLoggedIn, userCntrl.user_create_get);
router.post("/user/add", userCntrl.user_create_post);
router.get("/user/index", userCntrl.user_index_get);
router.get("/user/detail", userCntrl.user_show_get);
router.get("/user/delete", userCntrl.user_delete_get);
router.get("/user/edit", userCntrl.user_edit_get);
router.put("/user/update", userCntrl.user_update_put);



module.exports = router;
