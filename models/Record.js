const mongoose = require('mongoose');

// Schema
const recordSchema = mongoose.Schema({
    title: String,
    artist: String,
    description: String,
    condition: String,
    releaseDate: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, 

);

const Record = mongoose.model("Record", recordSchema);


module.exports = {Record};