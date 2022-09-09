const mongoose = require('mongoose');

// Schema
const recordSchema = mongoose.Schema({
    title: String,
    artist: String,
    Description: String,
    condition: String,
    releaseDate: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, 

);

const record = mongoose.models("Record", recordSchema);


module.exports = {record};