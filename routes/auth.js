const router = require('express').Router();

const authCntrl = require("../controllers/auth");

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })
  let upload = multer({ storage: storage })
// Routes
router.get("/auth/signup", authCntrl.auth_signup_get);
router.post("/auth/signup", upload.single('image'), authCntrl.auth_signup_post);
// router.get("/auth/myprofile", upload.single('image'), authCntrl.auth_signup_get);

router.get("/auth/signin", authCntrl.auth_signin_get);
router.post("/auth/signin", authCntrl.auth_signin_post);

router.get("/auth/logout", authCntrl.auth_logout_get);

router.get("/users/changePassword", authCntrl.password_change_get);
router.put("/users/updatePassword", authCntrl.password_update_put);



module.exports = router