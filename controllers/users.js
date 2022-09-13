// Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/user");
const {Payment} = require("../models/Payment");

//possibles








// Require Moment Library
const moment = require('moment');

// CRUD

// CREATE
// LOOK TO ../controllers/auth.js

// HTTP GET - User Index API
// exports.user_index_get = (req, res) => {
//     User.find()
//     .populate('record')
//     .then(users => {
//         res.render("users/myaccount", {users: users, moment})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // HTTP GET - User By Id
exports.user_show_get = (req, res) => {
    console.log(req.user._id);
    // Find the record by ID
    User.findById(req.user._id).populate('record')
    .then(user => {
        res.render("users/myaccount", {user, moment})
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE
// HTTP GET - Load User Edit Form
// exports.user_edit_get = (req, res) => {
//     User.findById(req.query.id)
//     .then((user) => {
//         res.render("users/edit", {user})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // HTTP PUT - User Update
// exports.user_update_put = (req, res) => {
//     console.log(req.body.id);

//     User.findByIdAndUpdate(req.body.id, req.body)
//     .then(() => {
//         res.redirect("/users/myaccount");
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

// // DELETE
// HTTP DELETE - User
// exports.user_delete_get = (req, res) => {
//     console.log(req.query.id);

//     User.findByIdAndDelete(req.query.id)
//     .then(() => {
//         res.redirect("/users/myaccount");
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }


var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });


//get

exports.user_picture_get = ('/', (req, res) => {
	imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagesPage', { items: items });
		}
	});
});

//post

exports.user_picture_post = ('/', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
            
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});
