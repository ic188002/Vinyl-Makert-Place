//User Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/user");

// Require Moment Library
const moment = require('moment');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');


// CRUD

// CREATE
// HTTP GET - Load Record From
exports.record_create_get = (req, res) => {
    User.find()
    .then((users) => {
        res.render("records/sell", {users})
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP POST - Record
exports.record_create_post = (req, res) => {
    // Saving the data into the Database
    let record = new Record(req.body);
    record.save()
    .then(() => {
        console.log(req.body.user);
            User.findById(req.body.user, (error, user) => {
                user.record.push(record);
                user.save();
            })
        res.redirect("/records/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


// HTTP GET - Record Index API
exports.record_index_get = (req, res) => {
    Record.find().populate('user')
    .then(records => {
        res.render("records/index", {records: records, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Record By Id
exports.record_show_get = (req, res) => {
    console.log(req.query.id);
    // Find the record by ID
    Record.findById(req.query.id).populate('user')
    .then(record => {
        res.render("records/detail", {record, moment})
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE
// HTTP GET - Load Record Edit Form
exports.record_edit_get = (req, res) => {
    Record.findById(req.query.id)
    .then((record) => {
        res.render("records/edit", {record})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Record Update
exports.record_update_put = (req, res) => {
    console.log(req.body.id);

    Record.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/records/index");
    })
    .catch(err => {
        console.log(err)
    })
}

// DELETE
// HTTP DELETE - Record
exports.record_delete_get = (req, res) => {
    console.log(req.query.id);

    Record.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/records/index");
    })
    .catch(err => {
        console.log(err);
    })
}

//

var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'albumuploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var albumUpload = multer({ storage: storage });


//get

exports.record_cover_get = ('/', (req, res) => {
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
exports.record_cover_post = ('/', albumUpload.single('image'), (req, res, next) => {

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
/////////////////////////////
const upload = require("../middleware/upload");
const dbConfig = require("../config/db");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:8080/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });

    // console.log(req.file);

    // if (req.file == undefined) {
    //   return res.send({
    //     message: "You must select a file.",
    //   });
    // }

    // return res.send({
    //   message: "File has been uploaded.",
    // });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });

    // return res.send({
    //   message: "Error when trying upload image: ${error}",
    // });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");

    const cursor = images.find({});

    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  uploadFiles,
  getListFiles,
  download,
};