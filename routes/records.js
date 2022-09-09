const express= require('express');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({ extended: true }));

const recordsCntrl = require("../controllers/records");

// IsLoggedIn middleware
const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get("/records/add", IsLoggedIn, recordsCntrl.record_create_get);
router.post("/records/add", recordsCntrl.record_create_post);
router.get("/records/index", recordsCntrl.record_index_get);
router.get("/records/detail", recordsCntrl.record_show_get);
router.get("/records/delete", recordsCntrl.record_delete_get);
router.get("/records/edit", recordsCntrl.record_edit_get);
router.put("/records/update", recordsCntrl.record_update_put);

module.exports = router;
