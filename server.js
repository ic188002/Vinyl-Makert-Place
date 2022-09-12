// Require Express
const express = require('express');

// Require and Initialze dotenv
require('dotenv').config();

// Require Connect Flash
const flash = require('connect-flash');

// Require Mongoose
const mongoose = require('mongoose');

// Port Configuration
const PORT = process.env.PORT;

// Initialze Express
const app = express();

// Using Connect Flash
app.use(flash());



var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
require('dotenv/config');

















// Look for all static files in public folder
// (CSS, JS, Images, Videos, Audio files)
app.use(express.static("public"));

// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Import Routes
const indexRouter = require('./routes/index');
const recordsRouter = require('./routes/records');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// Look into views folder for the file named as layout.ejs
app.use(expressLayouts);

// Express Session and Passport
let session = require('express-session');
let passport = require('./helper/ppConfig');
const { use } = require('./helper/ppConfig');

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 3600000}
}))

// Initialze passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Sharing the information with all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
})

// Mount Routes
app.use('/', indexRouter);
app.use('/', recordsRouter);
app.use('/', userRouter);
app.use('/', authRouter);

// NodeJS will look in a folder called views/ for all EJS related files.
app.set("view engine", "ejs");

// Validate database Connection
mongoose.connect(process.env.MongoDBURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("MongoDB connected!!!")
    }
);

// Validate server connection
app.listen(PORT, () => {
    console.log(`Discoid is running on port ${PORT}`);
})



///might need to go to controller


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
// var upload = multer({ storage: storage });

// var imgModel = require('models/user');

// app.get('/', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('imagesPage', { items: items });
//         }
//     });
// });


// app.post('/', upload.single('image'), (req, res, next) => {
  
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });
