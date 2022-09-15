const mongoose = require('mongoose');

// Schema
const recordSchema = mongoose.Schema({
    title: String,
    artist: String,
    description: String,
    condition: String,
    releaseDate: String,
    askingPrice: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    albumCover: {
        type: String
    }

},{timestamps: true});

const Record = mongoose.model("Record", recordSchema);


module.exports = {Record};